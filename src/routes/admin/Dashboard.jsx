import { useEffect, useState } from "react";
import { getItems } from "../../utils/hook";
import AllProducts from "./AllProducts";
import Animation from "../../assets/loader.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    async function collectItems() {
        try {
            const data = await getItems();
            setTimeout(() => {
                setProducts(data);
                setLoading(false);
            }, 300);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        collectItems();
    }, []);

    const deleteProduct = async (id) => {
        const docRef = doc(db, "items", id);
        try {
            await deleteDoc(docRef)
            setTimeout(() => {
                toast.success("Produit supprimé avec succès!");
                collectItems();
            }, 1000);
        } catch (error) {
            toast.error(error.message);
        }


    }

    return (
        <div className="mt-[10vh]">
            {loading ? (
                <Player
                    autoplay
                    loop
                    src={Animation}
                    style={{ height: "300px", width: "300px" }}
                ></Player>
            ) : (
                <AllProducts products={products} deleteProduct={deleteProduct} />
            )}
        </div>
    );
};

export default Dashboard;
