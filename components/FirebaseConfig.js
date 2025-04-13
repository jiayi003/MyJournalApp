import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBXuJKViKj8i99YAADKi_c3KD0w_uDT1Tg",
  authDomain: "mobile-75ca4.firebaseapp.com",
  databaseURL: "https://mobile-75ca4-default-rtdb.firebaseio.com",
  projectId: "mobile-75ca4",
  storageBucket: "mobile-75ca4.firebasestorage.app",
  messagingSenderId: "162799376244",
  appId: "1:162799376244:web:a8ae82641912fd3c0c3e21"
};
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { db, firestore, auth };
