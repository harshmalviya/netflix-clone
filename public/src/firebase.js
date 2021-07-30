import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBPfsQRLAsl9q8SsuWOMBbgka55e0jM23w",
  authDomain: "netflix-clone-27343.firebaseapp.com",
  projectId: "netflix-clone-27343",
  storageBucket: "netflix-clone-27343.appspot.com",
  messagingSenderId: "895811567416",
  appId: "1:895811567416:web:6f62251d92b6ef58520bcd",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
