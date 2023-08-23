import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmnT9WkSvTu815AFpE_HHjJxVOBJipJfs",
    authDomain: "cab-finder-react.firebaseapp.com",
    projectId: "cab-finder-react",
    storageBucket: "cab-finder-react.appspot.com",
    messagingSenderId: "75992217030",
    appId: "1:75992217030:web:350808a21c4dea9f142ec7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth }