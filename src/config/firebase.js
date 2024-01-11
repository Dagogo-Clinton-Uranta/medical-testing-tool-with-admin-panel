import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";


/*
const firebaseConfig = {
  apiKey: "AIzaSyCdlxFQSkuSiCD80rJnuuOVLbfwdtyKPzs",
  authDomain: "ibara-34497.firebaseapp.com",
  projectId: "ibara-34497",
  storageBucket: "ibara-34497.appspot.com",
  messagingSenderId: "886817189981",
  appId: "1:886817189981:web:f69ca549f78c1186cbddb4",
  measurementId: "G-TNGY4Q8KYS"
};*/


const firebaseConfig = {
  apiKey: "AIzaSyCgx9baI-Kq_rw6LRgBrEPQyPPn-iy1ZvM",
  authDomain: "ibara-project.firebaseapp.com",
  databaseURL: "https://ibara-project-default-rtdb.firebaseio.com",
  projectId: "ibara-project",
  storageBucket: "ibara-project.appspot.com",
  messagingSenderId: "894060294302",
  appId: "1:894060294302:web:2202039c22773708d54b8f",
  measurementId: "G-E1PDXXZ6B8"
};



// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();

export const storage = firebase.storage();

export const auth = firebase.auth();

export const static_img = 'https://firebasestorage.googleapis.com/v0/b/bridgetech-advance-project.appspot.com/o/profile_images%2Fprofile.jpg?alt=media&token=b3c94ada-1b08-4834-bbd1-647882c7195a';






