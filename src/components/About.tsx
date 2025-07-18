
import { Award, GraduationCap, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import drAminaPortrait from "@/assets/dr-amina-portrait.jpg";
import clinicLogo from "@/assets/clinic-logo.jpg";

export const About = () => {
  const qualifications = [
    "Doctorat en Médecine - Université Mohammed V, Rabat",
    "Spécialisation en Ophtalmologie - CHU Ibn Sina",
    "Fellowship en Chirurgie de la Rétine - Paris",
    "Certification en Chirurgie Réfractive - Londres"
  ];

  const experience = [
    "15 années d'expérience en chirurgie ophtalmologique",
    "Plus de 3000 interventions chirurgicales réussies",
    "Ancien Chef de Service d'Ophtalmologie - CHU",
    "Membre de la Société Marocaine d'Ophtalmologie"
  ];

  return (
    <section id="a-propos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            À propos du Dr. Amina Benali
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une expertise reconnue au service de votre vision, avec un engagement total 
            pour l'excellence médicale et le bien-être de nos patients.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo et présentation du Dr. Amina Benali */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 shadow-xl">
              {/* Portrait du docteur */}
              <div className="relative mb-6">
                <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={drAminaPortrait} 
                    alt="Dr. Amina Benali" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge avec logo */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-lg border-4 border-blue-100">
                  <div className="w-12 h-12">
                    <img 
                      src={clinicLogo} 
                      alt="Logo Clinique" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* Informations du docteur */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Amina Benali</h3>
                <p className="text-blue-600 font-semibold text-lg mb-1">Chirurgienne Ophtalmologue</p>
                <p className="text-gray-600 text-sm">Spécialiste certifiée</p>
              </div>
              
              {/* Citation */}
              <blockquote className="text-gray-700 italic text-center leading-relaxed">
                "Chaque patient mérite une attention personnalisée et des soins de la plus haute qualité. 
                Mon objectif est de préserver et d'améliorer votre vision avec les techniques les plus avancées."
              </blockquote>
            </div>
          </div>

          {/* Qualifications et expérience */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Formation & Diplômes</h3>
                </div>
                <ul className="space-y-3">
                  {qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{qual}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Expérience Professionnelle</h3>
                </div>
                <ul className="space-y-3">
                  {experience.map((exp, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{exp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
