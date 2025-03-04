import { Box, Container, Grid2 } from '@mui/material'
import { useCallback, useEffect, useState } from 'react';
import { Movie } from '../../Types/movieTypes';
import { getMovieDetail, getMovies } from '../../services/movieService';
import HomeBanner from './HomeBanner';
import MovieCarousel from './MovieCarousel';
import ModalDetail from '../../components/Modal/ModalDetail';
import HomeSkeleton from '../../components/Skeleton/HomeSkeleton';
import { toast } from 'react-toastify';
import ContainerCarousel from './ContainerCarousel';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<[]>([]);
  const [movieBanner, setMovieBanner] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const fetchMovieBanner = useCallback(async (slug: string) => {
    setIsLoading(true);
    try {
      const data = await getMovieDetail(slug);
      return data;
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu', error);
      toast.error('Lỗi khi lấy dữ liệu, vui lòng reload lại trang');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchApi = useCallback(async () => {
    try {
      const data = await getMovies(1);
      if (data.items.length > 0) {
        const [movieFirst] = data.items;
        setMovies(data.items);
        const movieBanner = await fetchMovieBanner(movieFirst.slug);
        setMovieBanner(movieBanner.movie);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu', error);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      {isLoading ?
        <HomeSkeleton />
        :
        <>
          <Grid2 className="h-[45vw] relative">
            <HomeBanner data={movieBanner} />
          </Grid2>
          <Box sx={{
            zIndex: 10, position: 'relative', marginTop: '-8vw',
            background: 'linear-gradient(rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 0.98) 8vw, rgb(17, 17, 17) 100%)'
          }}>
            <Container maxWidth='xl' disableGutters sx={{ paddingInline: '5%' }}>
              <MovieCarousel title="mới cập nhật" movies={movies} />
              <ContainerCarousel />
            </Container>
            <ModalDetail />
          </Box>
        </>
      }
    </>
  )
}

export default HomePage