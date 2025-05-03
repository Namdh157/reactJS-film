import { useCallback, useEffect, useRef, useState } from "react";
import { MovieItemGenre } from "../../Types/movieTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GenresParams } from "../../Types/genreTypes";
import { getMovieForGenre } from "../../services/movieService";
import { toast } from "react-toastify";
import InfinityScroll from "../../components/Common/InfinityScroll";
import MovieCarousel from "./MovieCarousel";
import CarouselSkeleton from "../../components/Skeleton/CarouselSkeleton";
interface MovieContainer {
  genre: string;
  movies: MovieItemGenre[];
}

const ContainerCarousel = () => {
  const [containerMovies, setContainerMovies] = useState<MovieContainer[]>([]);
  const indexGenresRef = useRef(0);
  const [page, setPage] = useState(1);
  const genres = useSelector((state: RootState) => state.genres.genres);


  const handleScroll = useCallback(async () => {
    const index = indexGenresRef.current;

    const genreParamsList = [0,1]
    .map(i => genres[index + i])
    .filter(Boolean)
    .map(genre => ({
      type_list: genre.slug,
      limit: 16
    }));

    if (genreParamsList.length === 0) return;

    try {
      const responses = await Promise.all(
        genreParamsList.map(params => getMovieForGenre(params))
      );
      const newData: MovieContainer[] = responses.map((response, i) => {
        if (response.data.items.length === 0) return null;
  
        return {
          genre: genres[index + i].name,
          movies: response.data.items
        };
      }).filter((item): item is MovieContainer => item !== null);
  
      if (newData.length > 0) {
        setContainerMovies(prev => [...prev, ...newData]);
      }
  
      indexGenresRef.current += genreParamsList.length;
    } catch {
      toast.error("Lấy danh sách phim thất bại");
    }
  }, [genres]);

  useEffect(() => {
    handleScroll();
  }, [page]);  

  return (
    <InfinityScroll
      hasMore={indexGenresRef.current <= genres.length - 2}
      loader={<CarouselSkeleton />}
      className="container-carousel"
      fetchMore={() => setPage(prev => prev + 1)}
    >

      {containerMovies.map((carousel, index) => (
        <MovieCarousel key={index} indexCarousel={index} title={carousel.genre} movies={carousel.movies} />
      ))}

    </InfinityScroll>
  )
}

export default ContainerCarousel