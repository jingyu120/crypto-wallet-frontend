// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyD1XDf8roZwl9Ul38GblBWogyvSdTqsRqM",
  authDomain: "react-chat-f71bf.firebaseapp.com",
  projectId: "react-chat-f71bf",
  storageBucket: "react-chat-f71bf.appspot.com",
  messagingSenderId: "455884864258",
  appId: "1:455884864258:web:aaa1c98b1d7a3fb2b2201b",
  measurementId: "G-J610CGFW0G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const isLoggedIn = () => {
  return auth.currentUser;
};
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
