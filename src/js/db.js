// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { f7 } from "framework7-react";
import { store } from "../state/store";
import { login, logout } from "../state/user/userSlice";

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

export const loginFirebase = () => {
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
      store.dispatch(logout());
      console.log("Sign-out successful");
      f7.views.current.router.navigate("/", {
        transition: "f7-dive",
        clearPreviousHistory: true,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    store.dispatch(login({ uid: user.uid }));

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Get data from database and save them to store
      store.dispatch(
        login({
          name: docSnap.data().name,
          gender: docSnap.data().gender,
          image: docSnap.data().image,
        })
      );
    } else {
      // Add new user to database
      setDoc(doc(db, "users", user.uid), {
        name: store.getState().user.name,
        gender: store.getState().user.gender,
        image: store.getState().user.image,
      });
    }
  } else {
    console.log("No logged in user found");
  }
});
