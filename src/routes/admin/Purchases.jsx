import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NotFound from "../../assets/notFound.json";
import Loader from "../../assets/loader.json";

import { Player } from "@lottiefiles/react-lottie-player";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import PurchasesCard from "../../components/PurchasesCard";

const Purchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    async function collectPurchases() {
        try {
            const purchasesCollectionRef = collection(db, "purchases");
            const data = await getDocs(purchasesCollectionRef);

            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPurchases(filteredData);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        collectPurchases();
    }, []);
    return (
        <div>
            {loading ? (
                <Player
                    autoplay
                    loop
                    src={Loader}
                    style={{ height: "400px", width: "400px" }}
                ></Player>
            ) : (
                <>
                    {purchases.length > 0 ? (
                        <PurchasesCard purchases={purchases} />
                    ) : (
                        <div>
                            <h1 className="text-center  font-[700] mt-[15vh]
 text-3xl text-blue-950 ">
                                No Purchase Found !!
                            </h1>
                            <Player
                                autoplay
                                loop
                                src={NotFound}
                                style={{ height: "400px", width: "400px" }}
                            ></Player>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Purchases
