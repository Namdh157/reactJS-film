import { useDispatch } from 'react-redux'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react';
import { getGenres } from './services/genreService';
import { AppDispatch } from './store/store';
import FullPageLoader from './components/Common/FullPageLoader';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  return (
    <>
      <AppRoutes />
      <FullPageLoader/>
    </>
  )
}

export default App
