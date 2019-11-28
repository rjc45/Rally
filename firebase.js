import * as firebase from 'firebase';
import  'firebase/firebase-firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBHT6JLBdBDjrm5eMReF6e_5qbHV52T1Zs",
    authDomain: "parg-rally.firebaseapp.com",
    databaseURL: "https://parg-rally.firebaseio.com",
    projectId: "parg-rally",
    storageBucket: "parg-rally.appspot.com",
    messagingSenderId: "391521014642",
    appId: "1:391521014642:web:de9c5b2ab718c82c8243eb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
var  firestore = firebase.firestore();

export default firestore;