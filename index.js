import { db } from './firebase.js';

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('uid');

// Eğer kullanıcı ID'si URL'den alınamıyorsa
if (!userId) {
  alert('Kullanıcı ID\'si (uid) URL\'de bulunamadı.');
  window.location.reload();  // Sayfayı yeniden yükleyin
}

// Firebase'den kullanıcı verilerini almak
const userRef = db.ref('users/' + userId);
userRef.once('value', (snapshot) => {
  if (snapshot.exists()) {
    const userData = snapshot.val();

    // Firebase'ten alınan verileri sayfada göstermek
    document.getElementById('user-name').textContent = userData.name || "Ad Bulunamadı";
    document.getElementById('click-count').textContent = userData.clickCount || 0;
    document.getElementById('user-points').textContent = userData.points || 0;

    const now = new Date();
    const lastClickDate = new Date(userData.lastClick);

    // Eğer kullanıcı bugünkü tıklama limitini aşmamışsa
    if (lastClickDate.toDateString() !== now.toDateString() && userData.clickCount < 1) {
      // Reklam izleme butonunu etkinleştir
      document.getElementById('watch-ad').addEventListener('click', () => {
        // Puan kazanma işlemi
        userData.points += 10; // Örneğin 10 puan kazanacak
        userData.clickCount += 1;
        userData.lastClick = now.toISOString();

        // Veriyi Firebase'e güncelle
        userRef.update({
          points: userData.points,
          clickCount: userData.clickCount,
          lastClick: userData.lastClick
        });

        // Kullanıcıyı bilgilendir
        alert('Reklam izlediniz ve 10 puan kazandınız!');
        window.location.reload();  // Sayfayı tekrar yükle
      });
    } else {
      // Eğer tıklama limiti aşılmışsa, butonu devre dışı bırak
      document.getElementById('watch-ad').disabled = true;
      alert('Bugün yalnızca bir kere reklam izleyebilirsiniz.');
    }
  } else {
    alert('Kullanıcı verileri bulunamadı.');
  }
});
