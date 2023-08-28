// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDNf3WJF0epkbbmlFUKwHayaFu-VE-ZTYM',
  authDomain: 'house-marketplace-app-dfcb8.firebaseapp.com',
  projectId: 'house-marketplace-app-dfcb8',
  storageBucket: 'house-marketplace-app-dfcb8.appspot.com',
  messagingSenderId: '382026820851',
  appId: '1:382026820851:web:b96035d042c9440dc21b86',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // We can delete the "const app =" because we just need to call the initialize.
export const db = getFirestore();
