import firebase from 'firebase';

require ("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyBSPFI0T4kKrbaMmA-svjcfvvLXn6YeNKk",
    authDomain: "booksanta-1ddfa.firebaseapp.com",
    projectId: "booksanta-1ddfa",
    storageBucket: "booksanta-1ddfa.appspot.com",
    messagingSenderId: "653693859365",
    appId: "1:653693859365:web:4832cca4ede9c881e4b1cc"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore