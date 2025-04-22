import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { db } from "./firebase.js";

const uid = new URLSearchParams(window.location.search).get('uid');
if (!uid) {
  alert("Kullanıcı ID'si alınamadı. Lütfen Telegram'dan tekrar giriş yapınız.");
  throw new Error("UID yok");
}

const userRef = ref(db, 'users/' + uid);
let userData = null;

function updateUI(data) {
  document.getElementById("user-name").textContent = data.name || "Bilinmiyor";
  document.getElementById("click-count").textContent = data.clickCount || 0;
  document.getElementById("user-points").textContent = data.points || 0;
  document.getElementById("plugain-coin-badge").textContent = `🏅 ${data.plugainCoins || 0} PC`;
}

get(userRef).then(snapshot => {
  if (!snapshot.exists()) {
    alert("Kullanıcı bulunamadı. Lütfen Telegram'dan giriş yapın.");
    return;
  }
  userData = snapshot.val();
  updateUI(userData);
});

document.getElementById("watch-ad").addEventListener("click", async () => {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const lastClick = userData.lastClick?.split('T')[0];

  if (lastClick === today) {
    alert("Bugün zaten reklam izlediniz. Yarın tekrar gelin!");
    return;
  }

  const newPoints = (userData.points || 0) + 10;
  const newClickCount = (userData.clickCount || 0) + 1;
  const newPlugainCoins = Math.floor(newPoints / 100);

  await update(userRef, {
    points: newPoints,
    clickCount: newClickCount,
    plugainCoins: newPlugainCoins,
    lastClick: now.toISOString()
  });

  userData.points = newPoints;
  userData.clickCount = newClickCount;
  userData.plugainCoins = newPlugainCoins;
  userData.lastClick = now.toISOString();
  updateUI(userData);

  alert("Reklam izlendi! +10 puan kazandınız.");
});
