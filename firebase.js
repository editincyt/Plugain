export const firebaseConfig = {
  databaseURL: "https://plugain-1f481-default-rtdb.europe-west1.firebasedatabase.app/"
  function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const mode = document.body.classList.contains('dark') ? '🌞 Light Mode' : '🌙 Dark Mode';
  document.querySelector('.toggle-mode').textContent = mode;
}

};
