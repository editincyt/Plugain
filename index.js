import { db } from './firebase.js';
import { get, ref, set, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const uid = new URLSearchParams(window.location.search).get('uid');
if (!uid) {
  alert("Kullanıcı ID'si (uid) URL'de bulunamadı.\nLütfen Telegram üzerinden tekrar giriş yapın.");
  throw new Error("Kullanıcı ID'si eksik.");
}

const userRef = ref(db, 'users/' + uid);

document.getElementById('watch-ad').addEventListener('click', async () => {
  const snapshot = await get(userRef);
  const user = snapshot.val();

  const now = new Date();
  const lastClick = user.lastClick ? new Date(user.lastClick) : null;
  const canClick = !lastClick || (now.toDateString() !== new Date(lastClick).toDateString());

  if (!canClick) {
    alert("Bugün zaten reklam izlediniz. Yarın tekrar gelin!");
    return;
  }

  let newClickCount = (user.clickCount || 0) + 1;
  let newPoints = (user.points || 0) + 10;

  const plugainCoins = Math.floor(newPoints / 100);

  await update(userRef, {
    clickCount: newClickCount,
    points: newPoints,
    plugainCoins: plugainCoins,
    lastClick: now.toISOString()
  });

  loadUserData(); // tekrar yükle
});

async function loadUserData() {
  const snapshot = await get(userRef);
  const user = snapshot.val();

  document.getElementById('user-name').innerText = user.name || 'Bilinmiyor';
  document.getElementById('click-count').innerText = user.clickCount || 0;
  document.getElementById('user-points').innerText = user.points || 0;
  document.getElementById('plugaincoin').innerText = user.plugainCoins || 0;
}

loadUserData();
