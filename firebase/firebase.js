import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDBeMWYBsWx9CyAnY39pPsQJGc5mAFpIo",
  authDomain: "lifegraph-d3578.firebaseapp.com",
  databaseURL: "https://lifegraph-d3578.firebaseio.com",
  projectId: "lifegraph-d3578",
  storageBucket: "lifegraph-d3578.appspot.com",
  messagingSenderId: "427885539070",
  appId: "1:427885539070:web:2b9ecb3542753e0924ffaf",
  measurementId: "G-14PL6CXKFJ"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
