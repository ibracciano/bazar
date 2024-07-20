import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import { auth, db } from "../config/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export const getItems = async () => {
    // referencer la collection
    const itemsCollectionref = collection(db, "items");
    // console.log(itemsCollectionref);

    // faire des requêtes pour ordonner les produits
    const q = query(itemsCollectionref, orderBy("isNew", "desc"));

    try {
        const data = await getDocs(q);
        // console.log(data);

        // Mettre les produits dans le bon format
        const filterData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        return filterData;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const isAdmin = async () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
            toast.warning("Please sign in first")
            setTimeout(() => {
                // rediriger vers la page login mais pas de navigate car nous n'avons pas de JSX
                window.location.href = "/login";
            }, 1000);
        } else {
            getRole(user.uid)
        }
    });

    const getRole = async (id) => {
        // récupérer le rôle du user
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef)
        const role = docSnap.data().role;
        if (role !== "admin") {
            toast.error("Page reserved for admin")
            setTimeout(() => {
                // rediriger vers la page login mais pas de navigate car nous n'avons pas de JSX
                window.location.href = "/";
            }, 3000);
        }
        unsubscribe()
    }
    return null;

}