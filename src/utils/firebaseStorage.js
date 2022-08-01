import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,

  // apiKey: "AIzaSyAILHN26mpy5Y1uyKxWlq2g8OHzR0C0neQ",
  // authDomain: "page-builder-ff066.firebaseapp.com",
  // projectId: "page-builder-ff066",
  // storageBucket: "page-builder-ff066.appspot.com",
  // messagingSenderId: "512016131640",
  // appId: "1:512016131640:web:a562e5b9ec0fc17ec3e8cd",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
