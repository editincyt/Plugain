// index.js
import { db } from './firebase.js';

// URL'den kullanıcı ID'sini al
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('uid');

// Eğer uid parametresi yoksa, kullanıcıyı uyar
if (!userId) {
  alert('Kullanıcı ID\'si (uid) URL\'de bulunamadı. Lütfen Telegram üzerinden tekrar giriş yapın.');
  window.location.reload();  // Sayfayı yeniden yükle
} else {
  console.log("User ID (uid): ", userId);  // Debug amaçlı, console'da kullanıcı ID'sini kontrol edin
}

// Firebase'ten kullanıcı verisini almak
const userRef = db.ref('users/' + userId);

userRef.once('value', (snapshot) => {
  if (snapshot.exists()) {
    const userData = snapshot.val();

    // Firebase'ten alınan verilerle sayfadaki bilgileri güncelle
    document.getElementById('user-name').textContent = userData.name || "Ad Bulunamadı";
    document.getElementById('click-count').textContent = userData.clickCount || 0;
    document.getElementById('user-points').textContent = userData.points || 0;
  } else {
    alert('Kullanıcı verileri bulunamadı.');
  }
});

// Reklam izleme butonuna tıklanabilirlik
document.getElementById('watch-ad').addEventListener('click', () => {
  alert('Reklam izlemeniz gerek');
  // Buraya reklam izleme fonksiyonelliğini ekleyebilirsiniz
});
