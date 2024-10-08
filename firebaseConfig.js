import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCPfmI-EojOJLAS7w6w5Zn6_WMHgfqLmFg",
  authDomain: "renascer-app.firebaseapp.com",
  projectId: "renascer-app",
  storageBucket: "renascer-app.appspot.com",
  messagingSenderId: "135230168657",
  appId: "1:135230168657:web:48307d52fd49c6d35ee270",
  measurementId: "G-Y0VG7SXETE"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);