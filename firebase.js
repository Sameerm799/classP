// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZmSyQ5kzQM7wb5GH-fxapMQNfuhiDG3k",
  authDomain: "class-project-56c55.firebaseapp.com",
  projectId: "class-project-56c55",
  storageBucket: "class-project-56c55.appspot.com",
  messagingSenderId: "271407468321",
  appId: "1:271407468321:web:c05d82ff130f6fd90d3860"
};

// Initialize Firebase
let app;
if (firebase.getApps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth();

export {auth};