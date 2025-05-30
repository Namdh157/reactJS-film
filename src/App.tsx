import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { getGenres } from "./services/genreService";
import { AppDispatch } from "./store/store";
import FullPageLoader from "./components/Common/FullPageLoader";
import { getCountries } from "./services/countryService";
import ModalDetail from "./components/Modal/ModalDetail";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getCountries());
  }, [dispatch]);
  return (
    <>
      <AppRoutes />
      <FullPageLoader />
      <ModalDetail />
    </>
  );
};

export default App;
