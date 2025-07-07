import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePages/HomePage";
import TestComponent from "../components/Common/TestComponent";
import Error from "../pages/ErrorPages/Error";
import NotFound from "../pages/ErrorPages/NotFound";
import LandingHomePage from "../pages/LandingPage/LandingHomePage";
import WatchMovie from "../pages/FilmPages/WatchMovie";
import GenrePage from "../pages/GenrePages/GenrePage";
import PageLayout from "../layouts/PageLayout";
import DetailFilm from "../pages/FilmPages/DetailFilm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingHomePage />} />
        <Route path="trang-chu" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="the-loai/:slug" element={<PageLayout />}>
          <Route index element={<GenrePage />} />
        </Route>
        <Route path="phim" element={<MainLayout />}>
          <Route index element={<h1>Phim</h1>} />
          <Route path=":name" element={<DetailFilm />} />
          <Route path="xem-phim/:name" element={<WatchMovie />} />
        </Route>
        <Route path="about" element={<h1>About</h1>} />
      </Route>

      <Route path="/test">
        <Route index element={<TestComponent />} />
      </Route>
      <Route path="/error-timeout" element={<Error />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
