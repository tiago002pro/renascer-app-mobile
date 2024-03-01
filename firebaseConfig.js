import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPfmI-EojOJLAS7w6w5Zn6_WMHgfqLmFg",
  authDomain: "renascer-app.firebaseapp.com",
  projectId: "renascer-app",
  storageBucket: "renascer-app.appspot.com",
  messagingSenderId: "135230168657",
  appId: "1:135230168657:web:4bd4cb0b5c423a185ee270",
  measurementId: "G-2GNS28C5KB"
};

// if (getApps().length === 0) {
  export const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app)
// }