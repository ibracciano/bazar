import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { decrementQuantity, incrementQuantity, remove, reset } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const CartItem = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.cart);



    return (
        <div className='w-2/3 pr-10'>
            <div className='w-full '>
                <h2 className='text-2xl font-titleFont'>shopping cart</h2>
            </div>
            <div>
                {products.map((item) => (
                    <div
                        key={item.id}
                        className='flex items-center justify-between gap-6 mt-6'
                    >
                        <div className='flex items-center gap-2 '>
                            <MdOutlineClose className='text-xl text-gray-600 duration-300 cursor-pointer hover:text-red-600 '
                                onClick={() => dispatch(remove(item)) & toast.error(`${item.title} is removed`)}
                            />
                            <img
                                src={item.image}
                                className='object-cover w-32 h-32'
                                alt='productImg'
                            />
                        </div>
                        <h2 className='w-52'>{item.title}</h2>
                        <p className='w-10'>${item.price}</p>
                        <div className='flex items-center justify-between gap-4 p-3 text-gray-500 border w-52'>
                            <p className='text-sm'>Quantity</p>
                            <div className='flex items-center gap-4 text-sm font-semibold'>
                                <span className='flex items-center justify-center h-5 px-2 text-lg font-normal duration-300 border cursor-pointer hover:bg-gray-700 hover:text-white active:bg-black'
                                    onClick={() => dispatch(decrementQuantity(item))}
                                >
                                    -
                                </span>
                                {item.quantity}
                                <span className='flex items-center justify-center h-5 px-2 text-lg font-normal duration-300 border cursor-pointer hover:bg-gray-700 hover:text-white active:bg-black'
                                    onClick={() => dispatch(incrementQuantity(item))}
                                >
                                    +
                                </span>
                            </div>
                        </div>
                        <p className='w-14'>${item.quantity * item.price}</p>
                    </div>
                ))}
            </div>
            <button className='px-6 py-1 mt-8 text-white duration-300 bg-red-500 ml-7 hover:bg-red-800'
                onClick={() => dispatch(reset()) & toast.warning("Your Cart is Empty")}>
                Reset Cart
            </button>
            <Link to='/'>
                <button className='flex items-center gap-1 mt-8 text-gray-400 duration-300 ml-7 hover:text-black '>
                    <span>
                        <HiOutlineArrowLeft />
                    </span>
                    go shopping
                </button>
            </Link>
        </div>
    );
};

export default CartItem;
