// firebase.js

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update } from 'firebase/database';

// Firebase yapılandırma bilgilerini buraya ekleyin
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, update };
