// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "API_KEY",  // Firebase API Key
  authDomain: "plugain-1f481.firebaseapp.com",
  databaseURL: "https://plugain-1f481-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "plugain-1f481",
  storageBucket: "plugain-1f481.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firebase Realtime Database bağlantısını al
const db = getDatabase(app);

export { db };
