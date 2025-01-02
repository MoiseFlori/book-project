// firebase-config.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBbTeZ-Ibd4e_4bKpWEvhb0ysCOtNSo24o',
  authDomain: 'authentication-book-app-4b9e9.firebaseapp.com',
  projectId: 'authentication-book-app-4b9e9',
  storageBucket: 'authentication-book-app-4b9e9.appspot.com',
  messagingSenderId: '538975740094',
  appId: '1:538975740094:web:8b02fcad62e5f85ca1beef',
};

// Inițializează Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
