
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { messageStorage } from "@/utils/localStorageService";

export const Contact = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.nom || !contactForm.email || !contactForm.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Sauvegarder le message dans le stockage local
    const newMessage = {
      id: Date.now().toString(),
      nom: contactForm.nom,
      email: contactForm.email,
      sujet: contactForm.sujet || 'Aucun sujet',
      message: contactForm.message,
      createdAt: new Date().toISOString()
    };

    messageStorage.saveMessage(newMessage);

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setContactForm({ nom: '', email: '', sujet: '', message: '' });
    console.log('Message de contact sauvegardé:', newMessage);
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nous Contacter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            N'hésitez pas à nous contacter pour toute question ou demande d'information. 
            Notre équipe est là pour vous accompagner.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 mb-4">Informations Pratiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      123 Avenue Mohammed V<br />
                      Casablanca 20000<br />
                      Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+212522123456" className="hover:text-blue-600 transition-colors">
                        +212 522 12 34 56
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">Urgences: +212 661 12 34 56</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contact@dr-benali.ma" className="hover:text-blue-600 transition-colors">
                        contact@dr-benali.ma
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Lundi - Vendredi: 9h00 - 18h00</p>
                      <p>Samedi: 9h00 - 13h00</p>
                      <p>Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carte Google Maps (placeholder) */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-teal-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Carte Google Maps</p>
                    <p className="text-sm text-gray-500">123 Avenue Mohammed V, Casablanca</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Envoyez-nous un message</CardTitle>
              <CardDescription className="text-gray-600">
                Nous vous répondrons dans les plus brefs délais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-nom">Nom complet *</Label>
                    <Input
                      id="contact-nom"
                      type="text"
                      value={contactForm.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">E-mail *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-sujet">Sujet</Label>
                  <Input
                    id="contact-sujet"
                    type="text"
                    value={contactForm.sujet}
                    onChange={(e) => handleInputChange('sujet', e.target.value)}
                    placeholder="Objet de votre message"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Votre message..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
