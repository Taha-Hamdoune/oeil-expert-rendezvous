
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Download, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateAppointmentPDF, downloadPDF, AppointmentData } from "@/utils/pdfGenerator";

interface AppointmentConfirmationProps {
  appointmentData: AppointmentData;
  onConfirmed: () => void;
  onBack: () => void;
}

export const AppointmentConfirmation = ({ appointmentData, onConfirmed, onBack }: AppointmentConfirmationProps) => {
  const { toast } = useToast();
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Simuler l'envoi d'un SMS avec code de confirmation
  const sendConfirmationSMS = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Simuler l'envoi du SMS
    toast({
      title: "SMS envoyé !",
      description: `Code de confirmation envoyé au ${appointmentData.telephone}. Code: ${code} (simulation)`,
    });

    // Stocker le code pour la vérification (en production, ceci serait géré côté serveur)
    localStorage.setItem('confirmationCode', code);
    
    return code;
  };

  const verifyConfirmationCode = async () => {
    setIsVerifying(true);
    
    setTimeout(() => {
      const storedCode = localStorage.getItem('confirmationCode');
      
      if (confirmationCode.toUpperCase() === storedCode) {
        setIsConfirmed(true);
        toast({
          title: "Rendez-vous confirmé !",
          description: "Votre rendez-vous a été confirmé avec succès. Vous pouvez maintenant télécharger votre PDF.",
        });
      } else {
        toast({
          title: "Code incorrect",
          description: "Le code de confirmation saisi est incorrect. Veuillez réessayer.",
          variant: "destructive"
        });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const downloadAppointmentPDF = () => {
    const pdfData = {
      ...appointmentData,
      confirmationCode: localStorage.getItem('confirmationCode') || ''
    };
    
    const htmlContent = generateAppointmentPDF(pdfData);
    downloadPDF(htmlContent, `rendez-vous-${pdfData.nom.replace(/\s+/g, '-')}.html`);
    
    toast({
      title: "PDF téléchargé",
      description: "Votre confirmation de rendez-vous a été téléchargée.",
    });
    
    // Nettoyer après téléchargement
    localStorage.removeItem('confirmationCode');
    onConfirmed();
  };

  if (isConfirmed) {
    return (
      <Card className="border-0 shadow-xl max-w-2xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <Check className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Rendez-vous Confirmé !</CardTitle>
              <CardDescription className="text-green-100">
                Votre rendez-vous a été enregistré avec succès
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Confirmation réussie !
            </h3>
            <p className="text-gray-600">
              Vous pouvez maintenant télécharger votre document de confirmation
              contenant tous les détails de votre rendez-vous.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={downloadAppointmentPDF}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white hover:scale-105 transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger le PDF de confirmation
            </Button>
            
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="w-full hover:bg-gray-50 transition-all duration-300"
            >
              Nouveau rendez-vous
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Important :</strong> Notre équipe vous contactera dans les 24h 
              pour confirmer définitivement votre rendez-vous et vous donner les 
              instructions de préparation si nécessaire.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <Phone className="w-8 h-8" />
          <div>
            <CardTitle className="text-2xl">Confirmation par SMS</CardTitle>
            <CardDescription className="text-orange-100">
              Vérifiez votre numéro de téléphone pour confirmer
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            Un code de confirmation va être envoyé au numéro :
          </p>
          <p className="text-xl font-semibold text-gray-900 mb-6">
            {appointmentData.telephone}
          </p>
          
          <Button
            onClick={sendConfirmationSMS}
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white hover:scale-105 transition-all duration-300"
          >
            <Phone className="w-4 h-4 mr-2" />
            Envoyer le code SMS
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="confirmationCode" className="text-sm font-medium text-gray-700">
              Code de confirmation (6 caractères)
            </Label>
            <Input
              id="confirmationCode"
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value.toUpperCase())}
              placeholder="Entrez le code reçu par SMS"
              className="h-12 text-center text-lg font-mono tracking-wider"
              maxLength={6}
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={verifyConfirmationCode}
              disabled={confirmationCode.length !== 6 || isVerifying}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white hover:scale-105 transition-all duration-300"
            >
              {isVerifying ? 'Vérification...' : 'Confirmer le code'}
            </Button>
            
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 hover:bg-gray-50 transition-all duration-300"
            >
              Retour
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note :</strong> En mode démonstration, le code est affiché dans la notification toast.
            En production, vous recevrez un véritable SMS.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
