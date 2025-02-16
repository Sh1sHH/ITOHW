document.addEventListener('DOMContentLoaded', function() {
    // Hastaları localStorage'dan al ve göster
    loadPatients();

    // Arama işlevselliği
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterPatients(searchTerm);
    });
});

function loadPatients() {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const tableBody = document.getElementById('patientTableBody');
    tableBody.innerHTML = '';

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.firstName} ${patient.lastName}</td>
            <td>${formatDate(patient.dateOfBirth)}</td>
            <td>${patient.phone}</td>
            <td>${patient.email}</td>
            <td>${patient.bloodType}</td>
            <td class="action-buttons">
                <button onclick="viewPatient('${patient.id}')" class="btn btn-view">Görüntüle</button>
                <button onclick="editPatient('${patient.id}')" class="btn btn-edit">Düzenle</button>
                <button onclick="deletePatient('${patient.id}')" class="btn btn-delete">Sil</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterPatients(searchTerm) {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const filteredPatients = patients.filter(patient => 
        patient.firstName.toLowerCase().includes(searchTerm) ||
        patient.lastName.toLowerCase().includes(searchTerm) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm)
    );

    const tableBody = document.getElementById('patientTableBody');
    tableBody.innerHTML = '';

    filteredPatients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.firstName} ${patient.lastName}</td>
            <td>${formatDate(patient.dateOfBirth)}</td>
            <td>${patient.phone}</td>
            <td>${patient.email}</td>
            <td>${patient.bloodType}</td>
            <td class="action-buttons">
                <button onclick="viewPatient('${patient.id}')" class="btn btn-view">Görüntüle</button>
                <button onclick="editPatient('${patient.id}')" class="btn btn-edit">Düzenle</button>
                <button onclick="deletePatient('${patient.id}')" class="btn btn-delete">Sil</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
}

function viewPatient(id) {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patient = patients.find(p => p.id === id);
    if (patient) {
        showModal('view', patient);
    }
}

function editPatient(id) {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patient = patients.find(p => p.id === id);
    if (patient) {
        showModal('edit', patient);
    }
}

function deletePatient(id) {
    if (confirm('Bu hastayı silmek istediğinizden emin misiniz?')) {
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const updatedPatients = patients.filter(patient => patient.id !== id);
        localStorage.setItem('patients', JSON.stringify(updatedPatients));
        loadPatients();
        showNotification('Hasta başarıyla silindi!', 'error');
    }
}

function showModal(type, patient) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal';

    const title = type === 'view' ? 'Hasta Bilgileri' : 'Hasta Düzenle';
    const content = type === 'view' ? getViewContent(patient) : getEditContent(patient);

    modalContent.innerHTML = `
        <button class="modal-close">&times;</button>
        <h3 class="modal-title">${title}</h3>
        ${content}
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Close button event
    modalContent.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });

    // Click outside to close
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });

    // Save button event for edit mode
    if (type === 'edit') {
        modalContent.querySelector('#editPatientForm').addEventListener('submit', (e) => {
            e.preventDefault();
            savePatient(patient.id);
            document.body.removeChild(modalOverlay);
        });
    }
}

function getViewContent(patient) {
    return `
        <div class="patient-details">
            <div class="detail-group">
                <div class="detail-label">Ad</div>
                <div class="detail-value">${patient.firstName}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Soyad</div>
                <div class="detail-value">${patient.lastName}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Doğum Tarihi</div>
                <div class="detail-value">${formatDate(patient.dateOfBirth)}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Cinsiyet</div>
                <div class="detail-value">${patient.gender === 'male' ? 'Erkek' : 'Kadın'}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Telefon</div>
                <div class="detail-value">${patient.phone}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">E-posta</div>
                <div class="detail-value">${patient.email}</div>
            </div>
            <div class="detail-group full">
                <div class="detail-label">Adres</div>
                <div class="detail-value">${patient.address}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Kan Grubu</div>
                <div class="detail-value">${patient.bloodType}</div>
            </div>
            <div class="detail-group">
                <div class="detail-label">Alerjiler</div>
                <div class="detail-value">${patient.allergies || 'Yok'}</div>
            </div>
            <div class="detail-group full">
                <div class="detail-label">Tıbbi Geçmiş</div>
                <div class="detail-value">${patient.medicalHistory || 'Yok'}</div>
            </div>
        </div>
    `;
}

function getEditContent(patient) {
    return `
        <form id="editPatientForm" class="form-grid">
            <div class="form-group">
                <label class="form-label">Ad</label>
                <input type="text" class="form-input" name="firstName" value="${patient.firstName}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Soyad</label>
                <input type="text" class="form-input" name="lastName" value="${patient.lastName}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Doğum Tarihi</label>
                <input type="date" class="form-input" name="dateOfBirth" value="${patient.dateOfBirth}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Cinsiyet</label>
                <select class="form-input" name="gender" required>
                    <option value="">Seçiniz</option>
                    <option value="male" ${patient.gender === 'male' ? 'selected' : ''}>Erkek</option>
                    <option value="female" ${patient.gender === 'female' ? 'selected' : ''}>Kadın</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Telefon</label>
                <input type="tel" class="form-input" name="phone" value="${patient.phone}" required>
            </div>
            <div class="form-group">
                <label class="form-label">E-posta</label>
                <input type="email" class="form-input" name="email" value="${patient.email}" required>
            </div>
            <div class="form-group full">
                <label class="form-label">Adres</label>
                <textarea class="form-input" name="address" rows="3" required>${patient.address}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Kan Grubu</label>
                <select class="form-input" name="bloodType" required>
                    <option value="">Seçiniz</option>
                    <option value="A+" ${patient.bloodType === 'A+' ? 'selected' : ''}>A+</option>
                    <option value="A-" ${patient.bloodType === 'A-' ? 'selected' : ''}>A-</option>
                    <option value="B+" ${patient.bloodType === 'B+' ? 'selected' : ''}>B+</option>
                    <option value="B-" ${patient.bloodType === 'B-' ? 'selected' : ''}>B-</option>
                    <option value="AB+" ${patient.bloodType === 'AB+' ? 'selected' : ''}>AB+</option>
                    <option value="AB-" ${patient.bloodType === 'AB-' ? 'selected' : ''}>AB-</option>
                    <option value="0+" ${patient.bloodType === '0+' ? 'selected' : ''}>0+</option>
                    <option value="0-" ${patient.bloodType === '0-' ? 'selected' : ''}>0-</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Alerjiler</label>
                <input type="text" class="form-input" name="allergies" value="${patient.allergies || ''}">
            </div>
            <div class="form-group full">
                <label class="form-label">Tıbbi Geçmiş</label>
                <textarea class="form-input" name="medicalHistory" rows="4">${patient.medicalHistory || ''}</textarea>
            </div>
            <div class="form-group full">
                <button type="submit" class="btn btn-primary">Kaydet</button>
            </div>
        </form>
    `;
}

function savePatient(id) {
    const form = document.getElementById('editPatientForm');
    const formData = new FormData(form);
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const patientIndex = patients.findIndex(p => p.id === id);

    if (patientIndex !== -1) {
        patients[patientIndex] = {
            ...patients[patientIndex],
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            dateOfBirth: formData.get('dateOfBirth'),
            gender: formData.get('gender'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            bloodType: formData.get('bloodType'),
            allergies: formData.get('allergies'),
            medicalHistory: formData.get('medicalHistory'),
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem('patients', JSON.stringify(patients));
        loadPatients();
        showNotification('Hasta bilgileri güncellendi', 'success');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
} 