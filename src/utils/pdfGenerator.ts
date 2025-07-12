
export interface AppointmentData {
  nom: string;
  telephone: string;
  email: string;
  cin: string;
  dateNaissance: string;
  service: string;
  date: string;
  heure: string;
  commentaires: string;
  confirmationCode: string;
}

export const generateAppointmentPDF = (data: AppointmentData): string => {
  const pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmation de Rendez-vous</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .header { text-align: center; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { width: 80px; height: 80px; background: linear-gradient(135deg, #0ea5e9, #14b8a6); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold; }
        .clinic-name { font-size: 28px; font-weight: bold; color: #0ea5e9; margin-bottom: 5px; }
        .clinic-subtitle { font-size: 16px; color: #666; }
        .confirmation { background: #f0f9ff; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .confirmation h2 { color: #0ea5e9; margin-bottom: 10px; }
        .confirmation-code { font-size: 24px; font-weight: bold; color: #059669; background: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #0ea5e9; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 15px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { padding: 10px; background: #f9fafb; border-radius: 5px; }
        .info-label { font-weight: bold; color: #374151; margin-bottom: 5px; }
        .info-value { color: #6b7280; }
        .footer { text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 40px; color: #6b7280; font-size: 14px; }
        .contact-info { background: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 20px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">Dr</div>
        <div class="clinic-name">Dr. Amina Benali</div>
        <div class="clinic-subtitle">Chirurgie Ophtalmologique</div>
    </div>

    <div class="confirmation">
        <h2>✅ Rendez-vous Confirmé</h2>
        <p>Votre demande de rendez-vous a été enregistrée avec succès</p>
        <div class="confirmation-code">Code: ${data.confirmationCode}</div>
    </div>

    <div class="section">
        <h3>📋 Informations Personnelles</h3>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Nom complet</div>
                <div class="info-value">${data.nom}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Téléphone</div>
                <div class="info-value">${data.telephone}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${data.email || 'Non renseigné'}</div>
            </div>
            <div class="info-item">
                <div class="info-label">CIN</div>
                <div class="info-value">${data.cin}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Date de naissance</div>
                <div class="info-value">${new Date(data.dateNaissance).toLocaleDateString('fr-FR')}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>🏥 Détails du Rendez-vous</h3>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Service demandé</div>
                <div class="info-value">${data.service}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Date souhaitée</div>
                <div class="info-value">${new Date(data.date).toLocaleDateString('fr-FR')}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Heure souhaitée</div>
                <div class="info-value">${data.heure}</div>
            </div>
        </div>
        ${data.commentaires ? `
        <div class="info-item" style="margin-top: 15px;">
            <div class="info-label">Commentaires</div>
            <div class="info-value">${data.commentaires}</div>
        </div>
        ` : ''}
    </div>

    <div class="contact-info">
        <h3>📞 Informations de Contact</h3>
        <p><strong>Clinique Dr. Amina Benali</strong></p>
        <p>📍 123 Avenue Mohammed V, Casablanca, Maroc</p>
        <p>📞 Téléphone: +212 5XX XX XX XX</p>
        <p>📧 Email: contact@clinique-benali.ma</p>
        <p>🕒 Horaires: Lun-Ven 9h-17h, Sam 9h-13h</p>
    </div>

    <div class="footer">
        <p><strong>Note importante:</strong> Ce document confirme votre demande de rendez-vous. Notre équipe vous contactera dans les 24h pour confirmer la disponibilité.</p>
        <p>Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
    </div>
</body>
</html>
  `;

  return pdfContent;
};

export const downloadPDF = (htmlContent: string, filename: string) => {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  }
};
