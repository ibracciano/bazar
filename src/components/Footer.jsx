import { logoLight, paymentMethod } from "../assets";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaHome,
} from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { BsPaypal, BsPersonFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
    return (
        <div className="bg-black text-[#949494] flex items-center justify-center font-titleFont h-[30vh]">
            <div className="max-w-[1200px] mx-auto gap-x-32 grid grid-cols-4">

                {/* ================= LogoIcon Start here ================== */}
                <div className='flex flex-col gap-7'>
                    <img src={logoLight} className='w-[130px]' alt='logoLight' />
                    <p className='text-white text-sm tracking-wide'>&copy; R.A.C</p>
                    <img src={paymentMethod} className='w-[224px]' alt='paymentLogo' />
                    <div className='flex gap-5 text-lg text-gray-400 '>
                        <ImGithub className='hoverStyle' />
                        <FaYoutube className='hoverStyle' />
                        <FaFacebookF className='hoverStyle' />
                        <FaTwitter className='hoverStyle' />
                        <FaInstagram className='hoverStyle' />
                    </div>
                </div>
                {/* =================  LogoIcon End here ===================  */}

                {/* ================= LocateUs Start here ==================  */}
                <div>
                    <h2 className='text-2xl font-semibold text-white mb-4'>locale us</h2>
                    <div className='text-base flex flex-col gap-2'>
                        <p>Abidjan, Riviera Abatta</p>
                        <p>Phone: 00225 0777646389</p>
                        <p>e-mail: bazaar@gmail.com</p>
                    </div>
                </div>
                {/* =================  LocateUs End here ===================  */}

                {/* =================  Profile Start here ==================  */}
                <div>
                    <h2 className='text-2xl font-semibold text-white mb-4'>profile</h2>
                    <div className='flex flex-col gap-2 text-base'>
                        <p className='flex items-center gap-3 hoverStyle'>
                            <span>
                                <BsPersonFill />
                            </span>{" "}
                            my account
                        </p>

                        <p className='flex items-center gap-3 hoverStyle'>
                            <span>
                                <BsPaypal />
                            </span>{" "}
                            checkout
                        </p>

                        <p className='flex items-center gap-3 hoverStyle'>
                            <span>
                                <FaHome />
                            </span>{" "}
                            order tracking
                        </p>

                        <p className='flex items-center gap-3 hoverStyle'>
                            <span>
                                <MdLocationOn />
                            </span>{" "}
                            help & support
                        </p>
                    </div>
                </div>
                {/* =================  Profile End here ====================  */}

                {/* ================= Subscribe Start here ================= */}
                <form className='flex flex-col justify-center'>
                    <input
                        type='text'
                        placeholder='e-mail'
                        className='bg-transparent border px-4 py-2 text-sm'
                    />
                    <button className='text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black'>
                        Subscribe
                    </button>
                </form>
                {/* ================= Subscribe End here ===================  */}
            </div>
        </div>
    );
};

export default Footer;
