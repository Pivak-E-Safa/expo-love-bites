// NEWWW
//
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDfHGnPWQrWwOHJW-szaIrfWNPc2hID3kI",
  authDomain: "expo-love-bites.firebaseapp.com",
  projectId: "expo-love-bites",
  storageBucket: "expo-love-bites.firebasestorage.app",
  messagingSenderId: "356994468765",
  appId: "1:356994468765:web:ff3337a10efd0b6c27bd74",
  measurementId: "G-QY6XQTCH7J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

// IOS: 58997111212-97ape976m5m5jvceqctue81b7k16gi4h.apps.googleusercontent.com
// Android: 58997111212-21obk57428qjt1vh1jcml6uen4qq0uno.apps.googleusercontent.com