// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD41zIu5pTyXmYmVP6qTmY8s7enZ-tewos",
  authDomain: "cocktail-search-a509a.firebaseapp.com",
  projectId: "cocktail-search-a509a",
  storageBucket: "cocktail-search-a509a.appspot.com",
  messagingSenderId: "787756538734",
  appId: "1:787756538734:web:3cb2d38335d1f3fa6d3f7f"
};

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}