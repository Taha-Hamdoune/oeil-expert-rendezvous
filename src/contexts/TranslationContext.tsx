
import { createContext, useContext, useState, ReactNode } from 'react';

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  fr: {
    // Header
    'header.home': 'Accueil',
    'header.about': 'À propos',
    'header.services': 'Services',
    'header.contact': 'Contact',
    'header.call': 'Appeler',
    'header.appointment': 'Rendez-vous',
    'header.doctor': 'Dr. Amina Benali',
    'header.specialty': 'Chirurgie Ophtalmologique',
    'header.admin': 'Espace Admin',
    
    // Services
    'services.title': 'Nos Services Spécialisés',
    'services.subtitle': 'Une gamme complète de services ophtalmologiques avec les technologies médicales les plus avancées pour tous vos besoins visuels.',
    'services.cta.title': 'Besoin d\'une consultation ?',
    'services.cta.subtitle': 'Prenez rendez-vous dès aujourd\'hui pour un examen personnalisé et des conseils adaptés à vos besoins visuels.',
    'services.cta.button': 'Prendre rendez-vous maintenant',
    'services.learn_more': 'En savoir plus',
    
    // Service names
    'service.eye_exam': 'Examen Complet de la Vue',
    'service.cataract': 'Chirurgie de la Cataracte',
    'service.glaucoma': 'Traitement du Glaucome',
    'service.refractive': 'Chirurgie Réfractive',
    'service.retina': 'Chirurgie de la Rétine',
    'service.followup': 'Suivi Post-Opératoire',

    // Service descriptions
    'service.eye_exam.desc': 'Dépistage et diagnostic précis des troubles visuels avec équipements de pointe',
    'service.cataract.desc': 'Intervention de pointe avec implants intra-oculaires dernière génération',
    'service.glaucoma.desc': 'Prise en charge complète pour préserver votre champ visuel',
    'service.refractive.desc': 'Correction de la myopie, hypermétropie et astigmatisme au laser',
    'service.retina.desc': 'Traitement des pathologies rétiniennes avec techniques microchirurgicales',
    'service.followup.desc': 'Accompagnement personnalisé pour une récupération optimale',

    // Appointment
    'appointment.title': 'Prendre Rendez-vous',
    'appointment.subtitle': 'Planifiez votre consultation en ligne. Nous vous contacterons rapidement pour confirmer votre rendez-vous.',
    'appointment.form_title': 'Formulaire de Rendez-vous',
    'appointment.form_subtitle': 'Remplissez ce formulaire pour demander un rendez-vous',
    'appointment.name': 'Nom complet',
    'appointment.phone': 'Numéro de téléphone',
    'appointment.email': 'Adresse e-mail (facultative)',
    'appointment.cin': 'Numéro d\'identification nationale (CIN)',
    'appointment.birth_date': 'Date de naissance',
    'appointment.service': 'Type de service demandé',
    'appointment.date': 'Date souhaitée',
    'appointment.time': 'Heure souhaitée',
    'appointment.comments': 'Commentaires ou informations supplémentaires',
    'appointment.submit': 'Envoyer la demande de rendez-vous',

    // Admin
    'admin.title': 'Espace Administrateur',
    'admin.login': 'Connexion Admin',
    'admin.username': 'Nom d\'utilisateur',
    'admin.password': 'Mot de passe',
    'admin.login_button': 'Se connecter',
    'admin.appointments': 'Gestion des Rendez-vous',
    'admin.patient': 'Patient',
    'admin.service': 'Service',
    'admin.datetime': 'Date et Heure',
    'admin.status': 'Statut',
    'admin.actions': 'Actions',
    'admin.accept': 'Accepter',
    'admin.reject': 'Refuser',
    'admin.pending': 'En attente',
    'admin.accepted': 'Accepté',
    'admin.rejected': 'Refusé',
    'admin.logout': 'Déconnexion',
  },
  ar: {
    // Header
    'header.home': 'الرئيسية',
    'header.about': 'من نحن',
    'header.services': 'الخدمات',
    'header.contact': 'اتصل بنا',
    'header.call': 'اتصال',
    'header.appointment': 'موعد',
    'header.doctor': 'د. أمينة بنعلي',
    'header.specialty': 'جراحة العيون',
    'header.admin': 'منطقة الإدارة',
    
    // Services
    'services.title': 'خدماتنا المتخصصة',
    'services.subtitle': 'مجموعة كاملة من خدمات طب العيون بأحدث التقنيات الطبية لجميع احتياجاتكم البصرية.',
    'services.cta.title': 'تحتاج إلى استشارة؟',
    'services.cta.subtitle': 'احجز موعدك اليوم للحصول على فحص شخصي ونصائح مناسبة لاحتياجاتك البصرية.',
    'services.cta.button': 'احجز موعدك الآن',
    'services.learn_more': 'اعرف المزيد',
    
    // Service names
    'service.eye_exam': 'فحص شامل للعين',
    'service.cataract': 'جراحة الساد',
    'service.glaucoma': 'علاج الجلوكوما',
    'service.refractive': 'الجراحة الانكسارية',
    'service.retina': 'جراحة الشبكية',
    'service.followup': 'المتابعة بعد الجراحة',

    // Service descriptions
    'service.eye_exam.desc': 'فحص ودراسة دقيقة للاضطرابات البصرية بأحدث المعدات',
    'service.cataract.desc': 'تدخل متقدم مع زراعة عدسات داخل العين من أحدث جيل',
    'service.glaucoma.desc': 'رعاية شاملة للحفاظ على مجال الرؤية',
    'service.refractive.desc': 'تصحيح قصر النظر وطول النظر واللابؤرية بالليزر',
    'service.retina.desc': 'علاج أمراض الشبكية بتقنيات الجراحة المجهرية',
    'service.followup.desc': 'مرافقة شخصية للتعافي الأمثل',

    // Appointment
    'appointment.title': 'حجز موعد',
    'appointment.subtitle': 'خطط لاستشارتك عبر الإنترنت. سنتصل بك قريباً لتأكيد موعدك.',
    'appointment.form_title': 'نموذج حجز الموعد',
    'appointment.form_subtitle': 'املأ هذا النموذج لطلب موعد',
    'appointment.name': 'الاسم الكامل',
    'appointment.phone': 'رقم الهاتف',
    'appointment.email': 'البريد الإلكتروني (اختياري)',
    'appointment.cin': 'رقم البطاقة الوطنية',
    'appointment.birth_date': 'تاريخ الميلاد',
    'appointment.service': 'نوع الخدمة المطلوبة',
    'appointment.date': 'التاريخ المرغوب',
    'appointment.time': 'الوقت المرغوب',
    'appointment.comments': 'تعليقات أو معلومات إضافية',
    'appointment.submit': 'إرسال طلب الموعد',

    // Admin
    'admin.title': 'منطقة الإدارة',
    'admin.login': 'تسجيل دخول الإدارة',
    'admin.username': 'اسم المستخدم',
    'admin.password': 'كلمة المرور',
    'admin.login_button': 'تسجيل الدخول',
    'admin.appointments': 'إدارة المواعيد',
    'admin.patient': 'المريض',
    'admin.service': 'الخدمة',
    'admin.datetime': 'التاريخ والوقت',
    'admin.status': 'الحالة',
    'admin.actions': 'الإجراءات',
    'admin.accept': 'قبول',
    'admin.reject': 'رفض',
    'admin.pending': 'في الانتظار',
    'admin.accepted': 'مقبول',
    'admin.rejected': 'مرفوض',
    'admin.logout': 'تسجيل الخروج',
  },
  en: {
    // Header
    'header.home': 'Home',
    'header.about': 'About',
    'header.services': 'Services',
    'header.contact': 'Contact',
    'header.call': 'Call',
    'header.appointment': 'Appointment',
    'header.doctor': 'Dr. Amina Benali',
    'header.specialty': 'Ophthalmic Surgery',
    'header.admin': 'Admin Area',
    
    // Services
    'services.title': 'Our Specialized Services',
    'services.subtitle': 'A complete range of ophthalmological services with the most advanced medical technologies for all your visual needs.',
    'services.cta.title': 'Need a consultation?',
    'services.cta.subtitle': 'Book your appointment today for a personalized examination and advice tailored to your visual needs.',
    'services.cta.button': 'Book appointment now',
    'services.learn_more': 'Learn more',
    
    // Service names
    'service.eye_exam': 'Complete Eye Examination',
    'service.cataract': 'Cataract Surgery',
    'service.glaucoma': 'Glaucoma Treatment',
    'service.refractive': 'Refractive Surgery',
    'service.retina': 'Retinal Surgery',
    'service.followup': 'Post-Operative Follow-up',

    // Service descriptions
    'service.eye_exam.desc': 'Precise screening and diagnosis of visual disorders with cutting-edge equipment',
    'service.cataract.desc': 'State-of-the-art intervention with latest generation intraocular implants',
    'service.glaucoma.desc': 'Comprehensive care to preserve your visual field',
    'service.refractive.desc': 'Laser correction of myopia, hyperopia and astigmatism',
    'service.retina.desc': 'Treatment of retinal pathologies with microsurgical techniques',
    'service.followup.desc': 'Personalized support for optimal recovery',

    // Appointment
    'appointment.title': 'Book Appointment',
    'appointment.subtitle': 'Schedule your consultation online. We will contact you quickly to confirm your appointment.',
    'appointment.form_title': 'Appointment Form',
    'appointment.form_subtitle': 'Fill out this form to request an appointment',
    'appointment.name': 'Full name',
    'appointment.phone': 'Phone number',
    'appointment.email': 'Email address (optional)',
    'appointment.cin': 'National ID number',
    'appointment.birth_date': 'Date of birth',
    'appointment.service': 'Type of service requested',
    'appointment.date': 'Preferred date',
    'appointment.time': 'Preferred time',
    'appointment.comments': 'Comments or additional information',
    'appointment.submit': 'Send appointment request',

    // Admin
    'admin.title': 'Administrator Area',
    'admin.login': 'Admin Login',
    'admin.username': 'Username',
    'admin.password': 'Password',
    'admin.login_button': 'Sign In',
    'admin.appointments': 'Appointment Management',
    'admin.patient': 'Patient',
    'admin.service': 'Service',
    'admin.datetime': 'Date and Time',
    'admin.status': 'Status',
    'admin.actions': 'Actions',
    'admin.accept': 'Accept',
    'admin.reject': 'Reject',
    'admin.pending': 'Pending',
    'admin.accepted': 'Accepted',
    'admin.rejected': 'Rejected',
    'admin.logout': 'Logout',
  }
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('fr');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
