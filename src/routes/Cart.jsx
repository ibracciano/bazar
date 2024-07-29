import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";


const Cart = () => {
    const { products, userInfo } = useSelector((state) => state.cart);
    const totalAmt = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);




    async function handleCheckOut() {
        if (userInfo) {
            const stripe = await loadStripe(
                "pk_test_51Mjm9UAfv3OviZVXB8r0oNRX0cT0Xkxt5MSlfv6YTGrdKV2SpTDwA3DaqtRa1qEdopEtDlWZxXjBmFd8EFteiUU500d4nvgIWL"
            );
            const response = await axios.post(
                "https://backend-bazar.onrender.com/api/create-checkout-session",
                {
                    products,
                }
            );
            const result = stripe.redirectToCheckout({
                sessionId: response.data.id,
            });
            if (result.error) {
                console.log(result.error);
            }
        } else {
            toast.error("Please sign in to Checkout");
        }
    }


    return (
        <div className='mt-[80px]'>
            <img
                src='https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                alt='cartImg'
                className='object-cover w-full h-60'
            />

            {products.length > 0 ? (
                <div className='max-w-[1200px] mx-auto py-20 flex'>
                    <CartItem />
                    <div className='w-1/3 bg-[#fafafa] py-6 px-4'>
                        <div className='flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6'>
                            <h2 className='text-2xl font-medium'>cart totals</h2>
                            <p className='flex items-center gap-4 text-base'>
                                Subtotal{" "}
                                <span className='text-lg font-bold font-titleFont'>
                                    $ {totalAmt}
                                </span>
                            </p>
                            <p className='flex items-start gap-4 text-base'>
                                Shipping{" "}
                                <span>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    Quos, veritatis.
                                </span>
                            </p>
                        </div>
                        <p className='flex justify-between mt-6 font-semibold font-titleFont '>
                            Total <span className='text-xl font-bold'>$ {totalAmt}</span>
                        </p>

                        <button className='w-full py-3 mt-6 text-base text-white duration-300 bg-black hover:bg-gray-800'
                            onClick={handleCheckOut}>
                            proceed to checkout
                        </button>
                    </div>

                </div>
            ) : (
                <div className='flex flex-col items-center my-6 gap-y-4 '>
                    <p className='text-orange-500 font-[500] text-lg'>
                        Your Cart is Empty. Please go back to Shopping and add Products to
                        Cart
                    </p>
                    <Link to='/'>
                        <button className='flex items-center gap-1 text-gray-400 duration-300 ml-7 hover:text-black '>
                            <span>
                                <HiOutlineArrowLeft />
                            </span>
                            go shopping
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
