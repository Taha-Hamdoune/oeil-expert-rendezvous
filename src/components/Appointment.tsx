import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/contexts/TranslationContext";
import { useNavigate } from "react-router-dom";
import { appointmentStorage } from "@/utils/localStorageService";

export const Appointment = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    { value: 'Examen complet de la vue', label: t('services.vue') },
    { value: 'Adaptation de lentilles de contact', label: t('services.lentilles') },
    { value: 'Chirurgie de la cataracte', label: t('services.cataracte') },
    { value: 'Traitement du glaucome', label: t('services.glaucome') },
    { value: 'Suivi de la dégénérescence maculaire', label: t('services.maculaire') }
  ];

  const heuresDisponibles = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.telephone || !formData.dateNaissance || !formData.service || !formData.date || !formData.heure) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Sauvegarder le rendez-vous dans le stockage local
    const newAppointment = {
      id: Date.now().toString(),
      nom: formData.nom,
      telephone: formData.telephone,
      email: formData.email,
      cin: formData.cin,
      dateNaissance: formData.dateNaissance,
      service: formData.service,
      date: formData.date,
      heure: formData.heure,
      commentaires: formData.commentaires,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    appointmentStorage.saveAppointment(newAppointment);

    // Rediriger vers la page de confirmation
    navigate('/appointment-confirmation', {
      state: {
        appointmentData: newAppointment,
        phoneNumber: formData.telephone
      }
    });

    console.log('Rendez-vous sauvegardé:', newAppointment);
  };

  return (
    <section id="rendez-vous" className="py-20 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('appointment.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('appointment.description')}
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">{t('appointment.card_title')}</CardTitle>
            <CardDescription className="text-gray-600">{t('appointment.card_description')}</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nom">{t('appointment.name')} *</Label>
                  <Input
                    type="text"
                    id="nom"
                    placeholder={t('appointment.name_placeholder')}
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">{t('appointment.phone')} *</Label>
                  <Input
                    type="tel"
                    id="telephone"
                    placeholder="+212 6XXXXXXXX"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cin">CIN</Label>
                  <Input
                    type="text"
                    id="cin"
                    placeholder="Votre CIN"
                    value={formData.cin}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateNaissance">{t('appointment.birthdate')} *</Label>
                <Input
                  type="date"
                  id="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">{t('appointment.service')} *</Label>
                <Select onValueChange={(value) => handleSelectChange('service', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('appointment.select_service')} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">{t('appointment.date')} *</Label>
                  <Input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heure">{t('appointment.time')} *</Label>
                  <Select onValueChange={(value) => handleSelectChange('heure', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('appointment.select_time')} />
                    </SelectTrigger>
                    <SelectContent>
                      {heuresDisponibles.map((heure) => (
                        <SelectItem key={heure} value={heure}>
                          {heure}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commentaires">{t('appointment.comments')}</Label>
                <Textarea
                  id="commentaires"
                  placeholder={t('appointment.comments_placeholder')}
                  className="min-h-[80px]"
                  value={formData.commentaires}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
                {t('appointment.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
