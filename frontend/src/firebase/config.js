// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjBrBFLOcX8QM6wnbc9hkhGOUOb3hVFNc",
  authDomain: "tishejwellery.firebaseapp.com",
  projectId: "tishejwellery",
  storageBucket: "tishejwellery.firebasestorage.app",
  messagingSenderId: "333864314698",
  appId: "1:333864314698:web:fb706e47e9e5da27afc3b3",
  measurementId: "G-TR4E3GE8K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
// googleProvider.setCustomParameters({
//   prompt: 'select_account'
// });

// Function to sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info
    const user = result.user;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    // If user doesn't exist, create a new document
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
        provider: 'google.com'
      });
    }
    
    return { user, token };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export { 
  auth, 
  db, 
  googleProvider, 
  signInWithGoogle, 
  GoogleAuthProvider 
};