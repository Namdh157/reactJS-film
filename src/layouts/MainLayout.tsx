import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from 'react-router';


const MainLayout = () => {

    return (
        <>
            <Header />
            {/* main content */}
            <main className="min-h-screen">
                <Outlet />
            </main>
            {/* footer */}
            <Footer />
        </>
    )
}


export default MainLayout