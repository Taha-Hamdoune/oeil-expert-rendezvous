
export interface StoredAppointment {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  cin: string;
  dateNaissance: string;
  service: string;
  date: string;
  heure: string;
  commentaires: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface StoredMessage {
  id: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  createdAt: string;
}

const APPOINTMENTS_KEY = 'clinic_appointments';
const MESSAGES_KEY = 'clinic_messages';

export const appointmentStorage = {
  getAppointments: (): StoredAppointment[] => {
    const stored = localStorage.getItem(APPOINTMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveAppointment: (appointment: StoredAppointment) => {
    const appointments = appointmentStorage.getAppointments();
    appointments.push(appointment);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  },

  updateAppointment: (id: string, updates: Partial<StoredAppointment>) => {
    const appointments = appointmentStorage.getAppointments();
    const index = appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updates };
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
    }
    return appointments;
  }
};

export const messageStorage = {
  getMessages: (): StoredMessage[] => {
    const stored = localStorage.getItem(MESSAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveMessage: (message: StoredMessage) => {
    const messages = messageStorage.getMessages();
    messages.push(message);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }
};
