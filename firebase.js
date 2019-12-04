import * as firebase from 'firebase';
import  'firebase/firebase-firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCWxwNnyyDPzHtP9PDF5zxb6R_Tznd-WuM",
  authDomain: "rally-a4340.firebaseapp.com",
  databaseURL: "https://rally-a4340.firebaseio.com",
  projectId: "rally-a4340",
  storageBucket: "rally-a4340.appspot.com",
  messagingSenderId: "90744093763",
  appId: "1:90744093763:web:e7758adce54948fd8da8f6"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
var  firestore = firebase.firestore();

export default firestore;