
import { useState } from "react";
import { Menu, X, Phone, Calendar, Languages, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/contexts/TranslationContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleCall = () => {
    const phoneNumber = "+212 522 12 34 56";
    if (confirm(`Voulez-vous appeler la clinique au ${phoneNumber} ?`)) {
      window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
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
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">Dr</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800">{t('header.doctor')}</h1>
              <p className="text-sm text-gray-600">{t('header.specialty')}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('accueil')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {t('header.home')}
            </button>
            <button 
              onClick={() => scrollToSection('a-propos')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {t('header.about')}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {t('header.services')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {t('header.contact')}
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 hover:scale-105 transition-all duration-300"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden lg:inline">{t('header.admin')}</span>
            </Button>

            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 h-8 text-xs hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
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
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">{t('header.call')}</span>
            </Button>
            <Button
              size="sm"
              onClick={() => scrollToSection('rendez-vous')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
            >
              <Calendar className="w-4 h-4" />
              {t('header.appointment')}
            </Button>
          </div>

          <button
            className="md:hidden hover:bg-gray-100 p-2 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                {t('header.home')}
              </button>
              <button 
                onClick={() => scrollToSection('a-propos')}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                {t('header.about')}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                {t('header.services')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left"
              >
                {t('header.contact')}
              </button>
              
              <div className="px-3 py-2 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin')}
                  className="w-full flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  {t('header.admin')}
                </Button>
                
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
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCall}
                  className="w-full flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {t('header.call')}
                </Button>
                <Button
                  size="sm"
                  onClick={() => scrollToSection('rendez-vous')}
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500"
                >
                  <Calendar className="w-4 h-4" />
                  {t('header.appointment')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
