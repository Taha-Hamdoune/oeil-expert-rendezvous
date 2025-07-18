
import { Button } from "@/components/ui/button";
import { Calendar, Award, Users, Heart } from "lucide-react";
import drAminaPortrait from "@/assets/dr-amina-portrait.jpg";
import clinicLogo from "@/assets/clinic-logo.jpg";
import medicalBg1 from "@/assets/medical-bg-1.jpg";
import medicalBg2 from "@/assets/medical-bg-2.jpg";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="pt-16 pb-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Images d'arrière-plan animées */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-48 rounded-lg overflow-hidden animate-pulse">
          <img src={medicalBg1} alt="Medical background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-10 right-10 w-64 h-48 rounded-lg overflow-hidden animate-pulse delay-1000">
          <img src={medicalBg2} alt="Medical background" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Contenu principal */}
          <div className="lg:col-span-8 mb-12 lg:mb-0 mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                ✨ Excellence en chirurgie ophtalmologique
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Votre vision,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                  notre expertise
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Bienvenue à la clinique du Dr. Amina Benali, spécialiste en chirurgie ophtalmologique. 
                Nous offrons des soins de pointe avec une approche personnalisée pour préserver et améliorer votre vision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                onClick={() => scrollToSection('rendez-vous')}
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-4 text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('services')}
                className="px-8 py-4 text-lg border-2 hover:bg-blue-50"
              >
                Nos services
              </Button>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mx-auto mb-3">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">3000+</div>
                <div className="text-sm text-gray-600">Patients traités</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image principale à droite */}
          <div className="lg:col-span-4 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                <div className="w-full h-80 rounded-xl overflow-hidden">
                  <img 
                    src={drAminaPortrait} 
                    alt="Dr. Amina Benali" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">Excellence médicale</h3>
                  <p className="text-gray-600 text-sm">Soins ophtalmologiques de pointe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
