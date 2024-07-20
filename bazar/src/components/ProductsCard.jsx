import { BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductsCard = ({ item }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const goToProduct = (product) => {
        const newTitle = product.title.split(" ").join("-").toLowerCase();
        navigate(`/product/${newTitle}`, { state: { product: product } });
    }


    return (
        <div className='relative group'>
            <div className='w-full overflow-hidden cursor-pointer h-96' onClick={() => goToProduct(item)}>
                <img
                    src={item.image}
                    alt='productImg'
                    className='object-cover w-full h-full duration-500 group-hover:scale-110'
                />
            </div>

            <div className='w-full border-[1px] px-2 py-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-base font-bold font-titleFont'>
                            {item.title.substring(0, 15)}
                        </h2>
                    </div>
                    <div className='relative flex justify-end gap-2 overflow-hidden text-sm w-28 '>
                        <div className='flex gap-2 transition-all duration-500 transform group-hover:translate-x-24 '>
                            <p className='text-gray-500 line-through'>${item.oldPrice}</p>
                            <p className='font-semibold'>${item.price}</p>
                        </div>
                        <p className='absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-all cursor-pointer duration-500 '
                            onClick={() => dispatch(add({ ...item, quantity: 1 })) & toast.success(`${item.title} is added to cart`)}
                        >
                            add to cart{" "}
                            <span>
                                <BsArrowRight />
                            </span>
                        </p>
                    </div>
                </div>
                <div>
                    <p>{item.category}</p>
                </div>
                <div className='absolute right-0 top-4'>
                    {item.isNew && (
                        <p className='px-6 py-1 font-semibold text-white bg-black font-titleFont '>
                            Sale
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;
