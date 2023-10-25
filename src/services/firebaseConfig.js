import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7583Kz1fHQVQVyDLjsdFSLDJRLcw5cL0",
  authDomain: "event-planner-85815.firebaseapp.com",
  projectId: "event-planner-85815",
  storageBucket: "event-planner-85815.appspot.com",
  messagingSenderId: "1022272103959",
  appId: "1:1022272103959:web:5bff55858b93e827f91e52",
  measurementId: "G-V3ZEY9T4K3"
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const fireAuth = firebase.auth();


const firebaseData = {
  fireStore,
  fireAuth,
};

export default firebaseData;