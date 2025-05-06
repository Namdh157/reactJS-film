import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import { Box, Container } from "@mui/material";

const PageLayout = () => {
  return (
    <>
      <Header />
      {/* main content */}
      <main className="min-h-screen">
        <Box className="bg-black min-h-screen pt-32">
          <Container maxWidth="xl" disableGutters sx={{ paddingInline: "5%" }}>
            <Outlet />
          </Container>
        </Box>
      </main>
      {/* footer */}
      <Footer />
    </>
  );
};

export default PageLayout;
