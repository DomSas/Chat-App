// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { f7 } from "framework7-react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJcrar_yCslJu5y6tr9h4xbEYWHJoLf8g",
  authDomain: "chat-app-70e02.firebaseapp.com",
  projectId: "chat-app-70e02",
  storageBucket: "chat-app-70e02.appspot.com",
  messagingSenderId: "598135368914",
  appId: "1:598135368914:web:8cccdd8e45dafedc0ad10b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const getGroups = async () => {
  const citiesCol = collection(db, "groups");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

export const loginFirestore = () => {
  signInAnonymously(auth)
    .then(() => {
      console.log("Signed in successful");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logoutFirebase = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
      f7.views.current.router.navigate("/", {
        transition: "f7-dive",
        clearPreviousHistory: true,
      });
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in user has id: " + user.uid);
    f7.views.current.router.navigate("/groups", {
      transition: "f7-dive",
      clearPreviousHistory: true,
    });
  } else {
    console.log("No logged in user found");
  }
});
