
import { useParams, useNavigate } from "react-router-dom";
import { Eye, Scissors, Shield, Activity, Clock, Heart, ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/contexts/TranslationContext";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const serviceDetails = {
    "examen-complet": {
      icon: Eye,
      title: t('service.eye_exam'),
      description: "Dépistage et diagnostic précis des troubles visuels avec équipements de pointe",
      duration: "45-60 minutes",
      price: "À partir de 800 DH",
      color: "bg-blue-100 text-blue-600",
      procedures: [
        "Examen de l'acuité visuelle",
        "Réfraction automatique et manuelle",
        "Mesure de la pression intraoculaire",
        "Examen du fond d'œil avec dilatation pupillaire",
        "Évaluation du champ visuel",
        "Analyse de la cornée et du cristallin"
      ],
      benefits: [
        "Détection précoce des pathologies oculaires",
        "Prescription précise de correction optique",
        "Évaluation complète de la santé oculaire",
        "Conseils personnalisés de prévention"
      ],
      preparation: [
        "Apportez vos lunettes et lentilles actuelles",
        "Évitez de conduire après l'examen (dilatation)",
        "Informez-nous de vos antécédents médicaux",
        "Apportez la liste de vos médicaments"
      ]
    },
    "chirurgie-cataracte": {
      icon: Scissors,
      title: "Chirurgie de la Cataracte",
      description: "Intervention de pointe avec implants intra-oculaires dernière génération",
      duration: "20-30 minutes",
      price: "À partir de 15000 DH",
      color: "bg-teal-100 text-teal-600",
      procedures: [
        "Phacoémulsification par ultrasons",
        "Implantation d'IOL (lentille intraoculaire)",
        "Chirurgie mini-invasive sans suture",
        "Anesthésie topique (gouttes)",
        "Surveillance post-opératoire immédiate"
      ],
      benefits: [
        "Récupération visuelle rapide",
        "Amélioration significative de la vision",
        "Réduction de la dépendance aux lunettes",
        "Technique sûre et éprouvée"
      ],
      preparation: [
        "Bilan pré-opératoire complet",
        "Arrêt de certains médicaments si nécessaire",
        "Accompagnement obligatoire le jour J",
        "Jeûne de 6h avant l'intervention"
      ]
    },
    "traitement-glaucome": {
      icon: Shield,
      title: "Traitement du Glaucome",
      description: "Prise en charge complète pour préserver votre champ visuel",
      duration: "Variable selon traitement",
      price: "Consultation à partir de 600 DH",
      color: "bg-green-100 text-green-600",
      procedures: [
        "Diagnostic par OCT et champ visuel",
        "Traitement médical par collyres",
        "Laser SLT (trabéculoplastie)",
        "Chirurgie filtrante si nécessaire",
        "Suivi régulier personnalisé"
      ],
      benefits: [
        "Préservation du champ visuel",
        "Ralentissement de la progression",
        "Traitement adapté à chaque cas",
        "Surveillance étroite"
      ],
      preparation: [
        "Apportez vos examens antérieurs",
        "Liste complète des traitements en cours",
        "Respect strict des rendez-vous de suivi",
        "Application rigoureuse des traitements"
      ]
    },
    "chirurgie-refractive": {
      icon: Activity,
      title: "Chirurgie Réfractive",
      description: "Correction de la myopie, hypermétropie et astigmatisme au laser",
      duration: "15-20 minutes par œil",
      price: "À partir de 12000 DH",
      color: "bg-purple-100 text-purple-600",
      procedures: [
        "LASIK femtoseconde dernière génération",
        "PKR personnalisée",
        "Bilan pré-opératoire complet",
        "Topographie cornéenne détaillée",
        "Contrôles post-opératoires réguliers"
      ],
      benefits: [
        "Liberté sans lunettes ni lentilles",
        "Vision nette immédiate",
        "Récupération rapide",
        "Résultats durables"
      ],
      preparation: [
        "Arrêt des lentilles 1 semaine avant",
        "Bilan complet de la cornée",
        "Stabilité de la vue depuis 2 ans",
        "Âge minimum 18 ans"
      ]
    },
    "chirurgie-retine": {
      icon: Heart,
      title: "Chirurgie de la Rétine",
      description: "Traitement des pathologies rétiniennes avec techniques microchirurgicales",
      duration: "1-3 heures selon complexité",
      price: "Devis personnalisé",
      color: "bg-red-100 text-red-600",
      procedures: [
        "Vitrectomie 25G mini-invasive",
        "Traitement des décollements de rétine",
        "Chirurgie des membranes épirétiniennes",
        "Réparation des trous maculaires",
        "Injections intravitréennes"
      ],
      benefits: [
        "Préservation de la vision centrale",
        "Techniques mini-invasives",
        "Récupération optimisée",
        "Suivi spécialisé"
      ],
      preparation: [
        "Bilan rétinien complet",
        "Angiographie si nécessaire",
        "Hospitalisation de jour",
        "Accompagnement indispensable"
      ]
    },
    "suivi-post-operatoire": {
      icon: Clock,
      title: "Suivi Post-Opératoire",
      description: "Accompagnement personnalisé pour une récupération optimale",
      duration: "30 minutes",
      price: "Inclus dans l'intervention",
      color: "bg-orange-100 text-orange-600",
      procedures: [
        "Contrôle à J+1, J+7, J+30",
        "Évaluation de la cicatrisation",
        "Adaptation des traitements",
        "Conseils personnalisés",
        "Rééducation si nécessaire"
      ],
      benefits: [
        "Récupération optimale",
        "Détection précoce des complications",
        "Accompagnement personnalisé",
        "Conseils adaptés"
      ],
      preparation: [
        "Respect des rendez-vous programmés",
        "Application rigoureuse des traitements",
        "Protection oculaire appropriée",
        "Signalement immédiat de tout problème"
      ]
    }
  };

  const service = serviceId ? serviceDetails[serviceId as keyof typeof serviceDetails] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service non trouvé</h1>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;

  const scrollToAppointment = () => {
    navigate('/#rendez-vous');
    setTimeout(() => {
      const element = document.getElementById('rendez-vous');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux services
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête du service */}
        <div className="text-center mb-12">
          <div className={`w-20 h-20 rounded-2xl ${service.color} flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {service.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <Clock className="w-4 h-4 mr-2" />
              Durée: {service.duration}
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              💰 {service.price}
            </Badge>
          </div>
        </div>

        {/* Grille d'informations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Procédures */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Procédures incluses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.procedures.map((procedure, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                    <span className="text-gray-700">{procedure}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                Avantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-600" />
                Préparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.preparation.map((prep, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
                    <span className="text-gray-700">{prep}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Prêt à prendre rendez-vous ?
              </h3>
              <p className="text-gray-600 mb-6">
                Contactez-nous dès aujourd'hui pour planifier votre consultation 
                et bénéficier de nos services spécialisés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={scrollToAppointment}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-4 hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-300 hover:scale-105"
                >
                  Contactez-nous
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
