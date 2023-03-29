import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDWNSCSPnb8x38DzVYWMYAkS-yN9DMl8iQ",
  authDomain: "linker-70e64.firebaseapp.com",
  projectId: "linker-70e64",
  storageBucket: "linker-70e64.appspot.com",
  messagingSenderId: "279956404271",
  appId: "1:279956404271:web:58374b1f10169b77226eda",
  measurementId: "G-EVBTLE2J4D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);