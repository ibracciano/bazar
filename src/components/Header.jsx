import { Link, useLocation } from "react-router-dom";
import { cartImg, logoDark, userImg } from "../assets";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { products, userInfo } = useSelector((state) => state.cart);

  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(false);
  }, [location])

  // console.log(products);
  return (
    <div className="w-full h-[10vh] bg-white border-b-[1px] border-b-gray-800 font-titleFont fixed top-0 z-50 left-0 right-0">
      <div className="max-w-[375px] md:max-w-[1200px] h-full mx-auto flex items-center justify-between ">
        <RxHamburgerMenu
          className="p-1 border border-black rounded-sm md:hidden"
          size={30}
        />
        <Link to="/">
          <div>
            <img src={logoDark} className="w-[110px]" alt="logoDark" />
          </div>
        </Link>
        <div className="flex items-center gap-[24px] md:gap-[32px]">
          <ul className="hidden md:flex items-center gap-[32px]">
            <li className="liStyle">
              {" "}
              <Link to="">Home</Link>{" "}
            </li>
            <li className="liStyle">Pages</li>
            <li className="liStyle">Shop</li>
            <li className="liStyle">Element</li>
            <li className="liStyle">Blog</li>
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img className="w-[24px]" src={cartImg} alt="cartImg" />
              <span className="absolute w-[24px] top-2 left-0 text-[14px] flex items-center justify-center font-semibold">
                {products.length}
              </span>
            </div>
          </Link>
          <Link to="/login" className="flex items-center gap-1">
            <img
              className="w-[32px] h-[32px] rounded-full border-[3px] border-red-600"
              src={userInfo ? userInfo.photoURL : userImg}
              alt="userLogo"
            />
            {userInfo && (
              <p className="text-base font-semibold font-titleFont">
                {userInfo.name.toLowerCase()}
              </p>
            )}
          </Link>


          <div className="relative">
            {visible ? (
              <BiSolidUpArrow
                className="cursor-pointer"
                onClick={() => {
                  setVisible(!visible);
                }}
              />
            ) : (
              <BiSolidDownArrow
                className="cursor-pointer"
                onClick={() => {
                  setVisible(!visible);
                }}
              />
            )}
            {visible && (
              <div className="absolute right-0 flex flex-col space-y-2 overflow-hidden bg-white border rounded-lg shadow-xl top-8 text-nowrap">
                <Link
                  to="/login"
                  className=" font-[600] hover:bg-blue-100 px-8 py-2 "
                >
                  Login Page
                </Link>{" "}
                <Link
                  to={"/dashboard"}
                  className={
                    userInfo?.role === "admin"
                      ? "  font-[600] hover:bg-blue-100  px-8 py-2 "
                      : "hidden"
                  }
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
