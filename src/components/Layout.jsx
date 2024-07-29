import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <div className="heightFull">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};


export default Layout;
