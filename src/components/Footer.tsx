
import { Heart, MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Informations de la clinique */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">Dr</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Dr. Amina Benali</h3>
                <p className="text-gray-400 text-sm">Chirurgie Ophtalmologique</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Expertise reconnue en chirurgie ophtalmologique avec un engagement 
              pour l'excellence médicale et le bien-être de nos patients.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('accueil')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('a-propos')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  À propos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('rendez-vous')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Prendre rendez-vous
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Avenue Mohammed V, Casablanca
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                <a 
                  href="tel:+212522123456" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  +212 522 12 34 56
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <a 
                  href="mailto:contact@dr-benali.ma" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  contact@dr-benali.ma
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            © 2024 Dr. Amina Benali - Clinique d'Ophtalmologie. 
            Fait avec <Heart className="w-4 h-4 text-red-500 mx-1" /> pour votre vision.
          </p>
        </div>
      </div>
    </footer>
  );
};
