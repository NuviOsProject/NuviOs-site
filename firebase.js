import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCshZe0JZibINfmOamUrnYPiBfVifNpiaA",
  authDomain: "nuvios.firebaseapp.com",
  projectId: "nuvios",
  storageBucket: "nuvios.firebasestorage.app",
  messagingSenderId: "595168231407",
  appId: "1:595168231407:web:81a026964f9e6571d7c01a",
  measurementId: "G-M1DGCYGZRV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function carregarMeta() {
    const ref = doc(db, "donations", "progress");
    const snap = await getDoc(ref);

    if (snap.exists()) {
        console.log(snap.data());
    } else {
        console.log("Documento não encontrado.");
    }
}

carregarMeta();
