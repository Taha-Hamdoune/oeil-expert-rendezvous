
import { Eye, Scissors, Shield, Activity, Clock, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Services = () => {
  const services = [
    {
      icon: Eye,
      title: "Examen Complet de la Vue",
      description: "Dépistage et diagnostic précis des troubles visuels avec équipements de pointe.",
      details: ["Réfraction et correction optique", "Mesure de la pression oculaire", "Examen du fond d'œil"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Scissors,
      title: "Chirurgie de la Cataracte",
      description: "Intervention de pointe avec implants intra-oculaires dernière génération.",
      details: ["Technique par ultrasons", "Implants multifocaux", "Récupération rapide"],
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: Shield,
      title: "Traitement du Glaucome",
      description: "Prise en charge complète pour préserver votre champ visuel.",
      details: ["Traitement médical", "Chirurgie mini-invasive", "Suivi personnalisé"],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Activity,
      title: "Chirurgie Réfractive",
      description: "Correction de la myopie, hypermétropie et astigmatisme au laser.",
      details: ["LASIK dernière génération", "PKR personnalisée", "Bilan pré-opératoire complet"],
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Heart,
      title: "Chirurgie de la Rétine",
      description: "Traitement des pathologies rétiniennes avec techniques microchirurgicales.",
      details: ["Décollement de rétine", "Membrane épirétinienne", "Trou maculaire"],
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Clock,
      title: "Suivi Post-Opératoire",
      description: "Accompagnement personnalisé pour une récupération optimale.",
      details: ["Consultations de contrôle", "Rééducation visuelle", "Conseils personnalisés"],
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const scrollToAppointment = () => {
    const element = document.getElementById('rendez-vous');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Services Spécialisés
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une gamme complète de services ophtalmologiques avec les technologies 
            médicales les plus avancées pour tous vos besoins visuels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Besoin d'une consultation ?
            </h3>
            <p className="text-gray-600 mb-6">
              Prenez rendez-vous dès aujourd'hui pour un examen personnalisé 
              et des conseils adaptés à vos besoins visuels.
            </p>
            <Button
              size="lg"
              onClick={scrollToAppointment}
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-4"
            >
              Prendre rendez-vous maintenant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
