
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";





const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_API_DOMAIN,
    projectId: import.meta.env.VITE_API_BAZAR,
    storageBucket: import.meta.env.VITE_API_BUCKET,
    messagingSenderId: import.meta.env.VITE_API_SENDER,
    appId: import.meta.env.VITE_API_ID,
};


const app = initializeApp(firebaseConfig);

// Utiliser auth pour gérer les utilisateurs
export const auth = getAuth(app)

// Utiliser provider pour se connecter avec Google
export const googleProvider = new GoogleAuthProvider()

// Utiliser db pour accéder à la base de données Firestore
export const db = getFirestore(app)

// Utiliser storage pour stocker les images
export const storage = getStorage(app)