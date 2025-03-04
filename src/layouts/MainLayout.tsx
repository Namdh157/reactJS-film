import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from 'react-router';
import { Container } from '@mui/material';

const MainLayout = () => {
    return (
        <>
            {/* header */}
            <Header />
            {/* main content */}
            <main className="min-h-screen">
                {/* <Container className="text-center"> */}
                    <Outlet />
                {/* </Container> */}
            </main>
            {/* footer */}
            <Footer />
        </>
    )
}

export default MainLayout