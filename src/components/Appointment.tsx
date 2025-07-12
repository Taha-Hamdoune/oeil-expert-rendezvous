
import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, FileText, IdCard, Cake } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const Appointment = () => {
  const { toast } = useToast();
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
    
    // Validation basique
    if (!formData.nom || !formData.telephone || !formData.cin || !formData.dateNaissance || !formData.service || !formData.date || !formData.heure) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Ici, les données seraient normalement envoyées à la base de données
    // Pour l'instant, on affiche juste un message de succès
    toast({
      title: "Rendez-vous demandé avec succès !",
      description: "Nous vous contacterons dans les plus brefs délais pour confirmer votre rendez-vous.",
    });

    // Reset du formulaire
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

    console.log('Données du rendez-vous:', formData);
  };

  return (
    <section id="rendez-vous" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prendre Rendez-vous
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Planifiez votre consultation en ligne. Nous vous contacterons rapidement 
            pour confirmer votre rendez-vous.
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Formulaire de Rendez-vous</CardTitle>
                <CardDescription className="text-blue-100">
                  Remplissez ce formulaire pour demander un rendez-vous
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations personnelles */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nom complet *
                  </Label>
                  <Input
                    id="nom"
                    type="text"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    placeholder="Votre nom complet"
                    className="h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Numéro de téléphone *
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    placeholder="+212 6XX XXX XXX"
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cin" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <IdCard className="w-4 h-4" />
                    Numéro d'identification nationale (CIN) *
                  </Label>
                  <Input
                    id="cin"
                    type="text"
                    value={formData.cin}
                    onChange={(e) => handleInputChange('cin', e.target.value)}
                    placeholder="Votre numéro CIN"
                    className="h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateNaissance" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Cake className="w-4 h-4" />
                    Date de naissance *
                  </Label>
                  <Input
                    id="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Adresse e-mail (facultative)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className="h-12"
                />
              </div>

              {/* Service demandé */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Type de service demandé *
                </Label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                  <SelectTrigger className="h-12">
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

              {/* Date et heure */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date souhaitée *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="h-12"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Heure souhaitée *
                  </Label>
                  <Select value={formData.heure} onValueChange={(value) => handleInputChange('heure', value)}>
                    <SelectTrigger className="h-12">
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

              {/* Commentaires */}
              <div className="space-y-2">
                <Label htmlFor="commentaires" className="text-sm font-medium text-gray-700">
                  Commentaires ou informations supplémentaires
                </Label>
                <Textarea
                  id="commentaires"
                  value={formData.commentaires}
                  onChange={(e) => handleInputChange('commentaires', e.target.value)}
                  placeholder="Décrivez brièvement vos symptômes ou préoccupations..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Note importante */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note importante :</strong> Ce formulaire constitue une demande de rendez-vous. 
                  Notre équipe vous contactera dans les 24h pour confirmer la disponibilité et finaliser votre rendez-vous.
                </p>
              </div>

              {/* Bouton d'envoi */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-4 text-lg font-medium"
              >
                Envoyer la demande de rendez-vous
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
