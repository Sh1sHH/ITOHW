document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Form verilerini topla
    const formData = {
        id: crypto.randomUUID(),
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        bloodType: document.getElementById('bloodType').value,
        allergies: document.getElementById('allergies').value,
        medicalHistory: document.getElementById('medicalHistory').value,
        createdAt: new Date().toISOString()
    };

    // LocalStorage'dan mevcut hastaları al
    const existingPatients = JSON.parse(localStorage.getItem('patients') || '[]');

    // Yeni hastayı ekle
    existingPatients.push(formData);

    // LocalStorage'a kaydet
    localStorage.setItem('patients', JSON.stringify(existingPatients));

    // Formu temizle
    this.reset();

    // Başarı mesajı göster
    showNotification('Hasta kaydı başarıyla oluşturuldu!');
});

function showNotification(message) {
    // Notification div oluştur
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--success);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    // Body'e ekle
    document.body.appendChild(notification);

    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 