import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyC85Ih8iIoCeTodXksWA8J6bfPWzSxASU8",
  authDomain: "fir-leet-week.firebaseapp.com",
  databaseURL: "https://fir-leet-week.firebaseio.com",
  projectId: "fir-leet-week",
  messagingSenderId: "238263637239",
  appId: "app-id"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
