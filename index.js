// index.js
import { db } from './firebase.js';

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('uid');  // 'uid' parametresini al

if (!userId) {
    alert('Kullanıcı ID\'si (uid) URL\'de bulunamadı. Lütfen Telegram üzerinden tekrar giriş yapın.');
    window.location.reload();  // Sayfayı yeniden yükle
} else {
    console.log("User ID (uid):", userId);  // Konsola yazdırarak kontrol et

    // Firebase veritabanından veri al
    const userRef = db.ref('users/' + userId);

    userRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log('Firebase Data:', userData);  // Firebase verisini konsola yazdırarak kontrol et
            document.getElementById('user-name').textContent = userData.name || "Ad Bulunamadı";
            document.getElementById('click-count').textContent = userData.clickCount || 0;
            document.getElementById('user-points').textContent = userData.points || 0;
        } else {
            console.log("Kullanıcı verisi bulunamadı.");
            alert('Kullanıcı verisi bulunamadı.');
        }
    });
}

document.getElementById('watch-ad').addEventListener('click', () => {
    // Reklam izleme ve puan ekleme işlemi
    const userRef = db.ref('users/' + userId);
    userRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const lastClick = userData.lastClick;

            // Bugün zaten tıklama yapılmış mı?
            const today = new Date().toISOString().split('T')[0];
            if (lastClick !== today) {
                userRef.update({
                    points: (userData.points || 0) + 10,  // 10 puan ekle
                    clickCount: (userData.clickCount || 0) + 1,
                    lastClick: today
                }).then(() => {
                    alert("Reklam izlediniz ve 10 puan kazandınız!");
                    location.reload();  // Sayfayı yeniden yükle
                });
            } else {
                alert("Bugün zaten reklam izlediniz.");
            }
        }
    });
});
