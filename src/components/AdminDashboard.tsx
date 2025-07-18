
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Users, Calendar, CheckCircle, XCircle, LogOut, Home, MessageSquare, Mail } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import { useNavigate } from "react-router-dom";
import { appointmentStorage, messageStorage, StoredAppointment, StoredMessage } from "@/utils/localStorageService";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);
  const [messages, setMessages] = useState<StoredMessage[]>([]);

  // Charger les données au montage du composant
  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const loadData = () => {
    const storedAppointments = appointmentStorage.getAppointments();
    const storedMessages = messageStorage.getMessages();
    
    // Ajouter quelques données de démonstration si vides
    if (storedAppointments.length === 0) {
      const mockAppointments: StoredAppointment[] = [
        {
          id: '1',
          nom: 'Ahmed Benali',
          telephone: '+212612345678',
          email: 'ahmed@email.com',
          cin: 'BE123456',
          dateNaissance: '1985-05-15',
          service: 'Examen complet de la vue',
          date: '2024-01-20',
          heure: '09:00',
          commentaires: 'Vision floue depuis quelques semaines',
          status: 'pending',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          nom: 'Fatima Alami',
          telephone: '+212698765432',
          email: 'fatima@email.com',
          cin: 'FA987654',
          dateNaissance: '1970-08-22',
          service: 'Chirurgie de la cataracte',
          date: '2024-01-25',
          heure: '14:30',
          commentaires: 'Problème de cataracte diagnostiqué',
          status: 'accepted',
          createdAt: '2024-01-12T14:20:00Z'
        }
      ];
      
      mockAppointments.forEach(apt => appointmentStorage.saveAppointment(apt));
      setAppointments(mockAppointments);
    } else {
      setAppointments(storedAppointments);
    }

    setMessages(storedMessages);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Récupérer les identifiants stockés ou utiliser les valeurs par défaut
    const storedUsername = localStorage.getItem('admin_username') || 'admin';
    const storedPassword = localStorage.getItem('admin_password') || 'clinique123';
    
    if (username === storedUsername && password === storedPassword) {
      setIsLoggedIn(true);
    } else {
      alert('Identifiants incorrects');
    }
  };

  const handleStatusChange = (appointmentId: string, newStatus: 'accepted' | 'rejected') => {
    const updatedAppointments = appointmentStorage.updateAppointment(appointmentId, { status: newStatus });
    setAppointments(updatedAppointments);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{t('admin.pending')}</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">{t('admin.accepted')}</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">{t('admin.rejected')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">{t('admin.login')}</CardTitle>
            <CardDescription className="text-gray-600">
              Accédez à l'espace administrateur de la clinique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-300"
              >
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  {t('admin.username')}
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {t('admin.password')}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 hover:border-blue-300 focus:border-blue-500 transition-colors duration-300"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-3 text-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
              >
                {t('admin.login_button')}
              </Button>
            </form>
            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => navigate('/admin/settings')}
              >
                Modifier nom d'utilisateur et mot de passe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{t('admin.title')}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-300"
              >
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                {t('admin.logout')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Rendez-vous</p>
                    <p className="text-3xl font-bold text-blue-600">{appointments.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">En Attente</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {appointments.filter(apt => apt.status === 'pending').length}
                    </p>
                  </div>
                  <Badge className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Acceptés</p>
                    <p className="text-3xl font-bold text-green-600">
                      {appointments.filter(apt => apt.status === 'accepted').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Messages</p>
                    <p className="text-3xl font-bold text-purple-600">{messages.length}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Rendez-vous
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">{t('admin.appointments')}</CardTitle>
                <CardDescription>Gérez les demandes de rendez-vous des patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('admin.patient')}</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>{t('admin.service')}</TableHead>
                        <TableHead>{t('admin.datetime')}</TableHead>
                        <TableHead>{t('admin.status')}</TableHead>
                        <TableHead>{t('admin.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{appointment.nom}</p>
                              <p className="text-sm text-gray-600">CIN: {appointment.cin}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm text-gray-900">{appointment.telephone}</p>
                              {appointment.email && (
                                <p className="text-sm text-gray-600">{appointment.email}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium text-gray-900">{appointment.service}</p>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{appointment.date}</p>
                              <p className="text-sm text-gray-600">{appointment.heure}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(appointment.status)}
                          </TableCell>
                          <TableCell>
                            {appointment.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(appointment.id, 'accepted')}
                                  className="bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-all duration-300"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  {t('admin.accept')}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(appointment.id, 'rejected')}
                                  className="border-red-300 text-red-700 hover:bg-red-50 hover:scale-105 transition-all duration-300"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  {t('admin.reject')}
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Messages de Contact</CardTitle>
                <CardDescription>Consultez les messages envoyés par les visiteurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Aucun message reçu</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <Card key={message.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{message.nom}</h3>
                              <p className="text-sm text-gray-600">{message.email}</p>
                            </div>
                            <p className="text-xs text-gray-500">{formatDate(message.createdAt)}</p>
                          </div>
                          <h4 className="font-medium text-gray-800 mb-2">{message.sujet}</h4>
                          <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
