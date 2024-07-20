import { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { add } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Product = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  //   console.log(state);

  const [details, setDetails] = useState({});
  const [baseQty, setBaseQty] = useState(1);

  useEffect(() => {
    setDetails(state.product);
  }, [state.product]);

  return (
    <div className="mt-[10vh]">
      <div className="mt-[120px] ">
        <div className="flex max-w-screen-xl gap-10 mx-auto my-10">
          <div className="relative w-2/5">
            <img
              src={details.image}
              className="w-full h-[550px] object-cover rounded-md"
              alt="productImg"
            />
            <div className="absolute right-0 top-4 ">
              {details.isNew && (
                <p className="px-8 py-1 font-semibold text-white bg-black font-titleFont ">
                  Sale
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center w-3/5 gap-12">
            <div>
              <h2 className="text-4xl font-semibold ">{details.title}</h2>
              <div className="flex items-center gap-4 mt-3 ">
                <p className="text-gray-500 line-through font-base">
                  ${details.oldPrice}
                </p>
                <p className="text-2xl font-medium text-gray-900">
                  ${details.price}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-base">
              <div className="flex">
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
              </div>
              <p className="text-xs text-gray-500">(1 Customer review)</p>
            </div>
            <p className="text-base text-gray-500">{details.description}</p>
            <div className="flex gap-4">
              <div className="flex items-center justify-between gap-4 p-3 text-gray-500 border w-52 ">
                <p className="text-sm">Quantity</p>
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <button
                    onClick={() => setBaseQty(baseQty === 1 ? 1 : baseQty - 1)}
                    className="flex items-center justify-center h-5 px-2 text-lg font-normal duration-300 border cursor-pointer hover:bg-gray-700 hover:text-white active:bg-black"
                  >
                    -
                  </button>
                  <span>{baseQty}</span>
                  <button
                    onClick={() => setBaseQty(baseQty + 1)}
                    className="flex items-center justify-center h-5 px-2 text-lg font-normal duration-300 border cursor-pointer hover:bg-gray-700 hover:text-white active:bg-black"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="px-6 py-3 text-white bg-black active:bg-gray-800"
                onClick={() =>
                  dispatch(add({ ...details, quantity: baseQty })) &
                  toast.success(`${details.title} is added to cart`)
                }
              >
                add to cart
              </button>
            </div>
            <p className="text-base text-gray-500">
              Category:{" "}
              <span className="font-medium capitalize">{details.category}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
