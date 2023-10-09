import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";



/*const firebaseConfig = {
  apiKey: "AIzaSyCdlxFQSkuSiCD80rJnuuOVLbfwdtyKPzs",
  authDomain: "ibara-34497.firebaseapp.com",
  projectId: "ibara-34497",
  storageBucket: "ibara-34497.appspot.com",
  messagingSenderId: "886817189981",
  appId: "1:886817189981:web:f69ca549f78c1186cbddb4",
  measurementId: "G-TNGY4Q8KYS"
};
*/

/*THIS IS JUST TO TEST, ABOVE IS THE ORIGINAL */
/*const firebaseConfig = {
  apiKey: "AIzaSyA6wRcGrtQ1yQ6VSZ7Y3y4dVG1pf92Rx7Q",
  authDomain: "ibara-substitute-db.firebaseapp.com",
  projectId: "ibara-substitute-db",
  storageBucket: "ibara-substitute-db.appspot.com",
  messagingSenderId: "583816383054",
  appId: "1:583816383054:web:fa0dfd20213d00feee511f",
  measurementId: "G-WRDH7CGN4N"
};*/


/*3rd databse cuz the 1st two are filling up  */
const firebaseConfig = {
  apiKey: "AIzaSyBTSpuiuXf0oj_-axh5jscLQaEtAH5xBEY",
  authDomain: "ibara-sub-3.firebaseapp.com",
  projectId: "ibara-sub-3",
  storageBucket: "ibara-sub-3.appspot.com",
  messagingSenderId: "129815972516",
  appId: "1:129815972516:web:c55364946ab9ad4fa8f431",
  measurementId: "G-6WY4C2S815"
};


// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();

export const storage = firebase.storage();

export const auth = firebase.auth();

export const static_img = 'https://firebasestorage.googleapis.com/v0/b/bridgetech-advance-project.appspot.com/o/profile_images%2Fprofile.jpg?alt=media&token=b3c94ada-1b08-4834-bbd1-647882c7195a';






