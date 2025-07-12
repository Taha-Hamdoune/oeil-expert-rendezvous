
import { useState } from "react";
import { Menu, X, Phone, Calendar, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("fr");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleCall = () => {
    const phoneNumber = "+212 5XX XX XX XX"; // Remplacez par le vrai numéro
    if (confirm(`Voulez-vous appeler la clinique au ${phoneNumber} ?`)) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇲🇦" },
    { code: "en", name: "English", flag: "🇺🇸" }
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Dr</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800">Dr. Amina Benali</h1>
              <p className="text-sm text-gray-600">Chirurgie Ophtalmologique</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('accueil')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('a-propos')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              À propos
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-24 h-8 text-xs">
                <div className="flex items-center gap-1">
                  <Languages className="w-3 h-3" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span className="text-xs">{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCall}
              className="flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">Appeler</span>
            </Button>
            <Button
              size="sm"
              onClick={() => scrollToSection('rendez-vous')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
            >
              <Calendar className="w-4 h-4" />
              Rendez-vous
            </Button>
          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile Ouvert */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                Accueil
              </button>
              <button 
                onClick={() => scrollToSection('a-propos')}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                À propos
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                Contact
              </button>
              
              {/* Sélecteur de langue mobile */}
              <div className="px-3 py-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full h-10">
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="px-3 py-2 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCall}
                  className="w-full flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Appeler
                </Button>
                <Button
                  size="sm"
                  onClick={() => scrollToSection('rendez-vous')}
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500"
                >
                  <Calendar className="w-4 h-4" />
                  Rendez-vous
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
