import { useEffect } from "react";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";


import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "../redux/slices/cartSlice";

const PaymentDone = () => {
    const dispatch = useDispatch();
    const height = window.screen.height;
    const width = window.screen.width;

    const purchasesCollectionRef = collection(db, "purchases");
    const { products, userInfo } = useSelector((state) => state.cart);
    const location = useLocation();
    const navigate = useNavigate();

    async function sentPurchases() {
        if (products.length > 0) {
            await addDoc(purchasesCollectionRef, {
                products: products,
                buyer: userInfo,
                timestamp: serverTimestamp(),
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    toast.error(`${error.code} -- ${error.message}`);
                });
        } else {
            return;
        }
    }


    useEffect(() => {
        if (location.search) {
            // console.log('ici2')
            sentPurchases();
            dispatch(reset()); //
        } else {
            navigate("/");
        }
    }, []);
    return (
        <>
            <div className='mt-[80px] h-[700px] flex items-center justify-center'>
                <h1 className='text-[40px] font-[600] text-red-400 animate-bounce'>
                    Thank You for your purchases !! 🙏😊
                </h1>
                <Confetti width={width} height={height} />
            </div>
        </>
    );
};

export default PaymentDone;
