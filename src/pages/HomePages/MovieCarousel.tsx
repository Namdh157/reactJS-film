import { useEffect, useRef, useState } from "react";
import { MovieItemGenre } from "../../Types/movieTypes";
import { Box } from "@mui/material";
import IconButtonComponent from "../../components/Common/IconButtonComponent";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Card1Component from "../../components/Common/Card1Component";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modalSlice";
import Card2Component from "../../components/Common/Card2Component";
import Card3Component from "../../components/Common/Card3Component";

type MovieCarouselProps = {
    indexCarousel?: number;
    title: string;
    movies: MovieItemGenre[];
};

const MovieCarousel = ({ indexCarousel, title, movies }: MovieCarouselProps) => {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();    

    const nextSLide = () => {
        if (index < movies.length) {
            setIndex(index + 2);
        }
    };

    const prevSlide = () => {
        if (index > 0) {
            setIndex(index - 2);
        }
    };

    useEffect(() => {
        if (containerRef.current && cardRef.current) {
            containerRef.current.style.transform = `translateX(-${(100 / 6) * index}%)`;
        }
    }, [index]);


    return (
        <div className="text-white relative">
            <div className="overflow-x-hidden">
                <h2 className="text-2xl font-bold mb-3">Thể loại phim {title}</h2>
                <Box
                    className="flex flex-nowrap transition-all"
                    sx={{ '&::-webkit-scrollbar': { display: 'none' }, transition: 'all 0.5s ease-in-out' }}
                    ref={containerRef}
                >
                    {movies.map((movie, index) => {
                        let CardComponent;

                        switch (indexCarousel) {
                            case 2:
                                CardComponent = Card2Component;
                                break;
                            case 4:
                                CardComponent = Card3Component;
                                break;
                            default:
                                CardComponent = Card1Component;
                        }

                        return (
                            <CardComponent
                                key={index}
                                movie={movie}
                                ref={cardRef}
                                handleClicked={(slug) => dispatch(openModal(slug))}
                            />
                        );
                    })}
                </Box>
                <IconButtonComponent
                    icon={<ArrowBackIosNewRoundedIcon sx={{ fontSize: '37px' }} />}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '-5%',
                        display: index === 0 ? 'none' : 'block',
                        color: 'primary.contrastText',
                        border: 'none',
                        transform: 'translateY(-50%)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    }}
                    onClick={prevSlide}
                />
                <IconButtonComponent
                    icon={<ArrowForwardIosRoundedIcon sx={{ fontSize: '37px' }} />}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '-5%',
                        display: index >= (movies.length - 6) ? 'none' : 'block',
                        color: 'primary.contrastText',
                        border: 'none',
                        transform: 'translateY(-50%)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    }}
                    onClick={nextSLide}
                />
            </div>
        </div>
    )
}

export default MovieCarousel