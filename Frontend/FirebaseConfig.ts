// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAaNBSEyq5YQvYI8zkTK4dzcZqTxf9JvaY',
  authDomain: 'reddit-5d95a.firebaseapp.com',
  projectId: 'reddit-5d95a',
  storageBucket: 'reddit-5d95a.appspot.com',
  messagingSenderId: '694168553969',
  appId: '1:694168553969:web:8825c6000dfac892d31c50',
  measurementId: 'G-8HRPJK3C9P',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
