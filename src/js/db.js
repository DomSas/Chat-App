// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { f7 } from "framework7-react";
import { store } from "../state/store";
import { login, logout } from "../state/slices/userSlice";
import { addGroups } from "../state/slices/groupsSlice";

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
    .then(async () => {
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
    store.dispatch(addGroups(await getChatGroupsFirebase()));

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

export const getChatGroupsFirebase = async () => {
  const groupsCollection = collection(db, "groups");
  const groupSnapshot = await getDocs(groupsCollection);
  const chatGroups = groupSnapshot.docs.map((document) => document.data());
  let studying = [];
  let travelling = [];

  chatGroups.map((item) => {
    switch (item.category) {
      case "Travelling":
        travelling.push(item);
        break;
      case "Studying":
        studying.push(item);
        break;
    }
  });

  return { Studying: studying, Travelling: travelling };
};
