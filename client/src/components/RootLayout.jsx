import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigavtion";
import { GiQuillInk } from "react-icons/gi";

const RootLayout = () => {
    return ( <>
    <Navigation/>
    <main className="min-h-dvh text-rose-500 relative">
        <Outlet/>

        <Link to='/add-blog' className="size-12 border-2 border-rose-500 rounded-full grid place-content-center text-rose-500 fixed bottom-5 z-50 right-5 transition hover:bg-rose-500 hover:text-white">
        <GiQuillInk className="text-3xl"/>
        </Link>
    </main>
    <Footer/>
    </> );
}
 
export default RootLayout;