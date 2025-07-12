
import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, FileText, IdCard, Cake } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AppointmentConfirmation } from "@/components/AppointmentConfirmation";
import { useTranslation } from "@/contexts/TranslationContext";
import { AppointmentData } from "@/utils/pdfGenerator";

export const Appointment = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    cin: '',
    dateNaissance: '',
    service: '',
    date: '',
    heure: '',
    commentaires: ''
  });

  const services = [
    "Examen complet de la vue",
    "Chirurgie de la cataracte", 
    "Traitement du glaucome",
    "Chirurgie réfractive (LASIK)",
    "Chirurgie de la rétine",
    "Consultation de suivi",
    "Urgence ophtalmologique"
  ];

  const heures = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.telephone || !formData.cin || !formData.dateNaissance || !formData.service || !formData.date || !formData.heure) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    console.log('Données du rendez-vous:', formData);
    setShowConfirmation(true);
  };

  const handleConfirmed = () => {
    setShowConfirmation(false);
    setFormData({
      nom: '',
      telephone: '',
      email: '',
      cin: '',
      dateNaissance: '',
      service: '',
      date: '',
      heure: '',
      commentaires: ''
    });
  };

  const handleBackToForm = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <section id="rendez-vous" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentConfirmation
            appointmentData={formData as AppointmentData}
            onConfirmed={handleConfirmed}
            onBack={handleBackToForm}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="rendez-vous" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('appointment.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('appointment.subtitle')}
          </p>
        </div>

        <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">{t('appointment.form_title')}</CardTitle>
                <CardDescription className="text-blue-100">
                  {t('appointment.form_subtitle')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('appointment.name')} *
                  </Label>
                  <Input
                    id="nom"
                    type="text"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    placeholder="Votre nom complet"
                    className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t('appointment.phone')} *
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    placeholder="+212 6XX XXX XXX"
                    className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cin" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <IdCard className="w-4 h-4" />
                    {t('appointment.cin')} *
                  </Label>
                  <Input
                    id="cin"
                    type="text"
                    value={formData.cin}
                    onChange={(e) => handleInputChange('cin', e.target.value)}
                    placeholder="Votre numéro CIN"
                    className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateNaissance" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Cake className="w-4 h-4" />
                    {t('appointment.birth_date')} *
                  </Label>
                  <Input
                    id="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                    className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t('appointment.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t('appointment.service')} *
                </Label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                  <SelectTrigger className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300">
                    <SelectValue placeholder="Sélectionnez le service souhaité" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service, index) => (
                      <SelectItem key={index} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {t('appointment.date')} *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {t('appointment.time')} *
                  </Label>
                  <Select value={formData.heure} onValueChange={(value) => handleInputChange('heure', value)}>
                    <SelectTrigger className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300">
                      <SelectValue placeholder="Sélectionnez l'heure" />
                    </SelectTrigger>
                    <SelectContent>
                      {heures.map((heure, index) => (
                        <SelectItem key={index} value={heure}>
                          {heure}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commentaires" className="text-sm font-medium text-gray-700">
                  {t('appointment.comments')}
                </Label>
                <Textarea
                  id="commentaires"
                  value={formData.commentaires}
                  onChange={(e) => handleInputChange('commentaires', e.target.value)}
                  placeholder="Décrivez brièvement vos symptômes ou préoccupations..."
                  className="min-h-[100px] hover:border-blue-300 focus:border-blue-500 transition-colors duration-300"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note importante :</strong> Après envoi, vous recevrez un code de confirmation par SMS 
                  pour valider votre demande et télécharger votre document de confirmation.
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-4 text-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
              >
                {t('appointment.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
