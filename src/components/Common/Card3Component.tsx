import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { MovieItemGenre } from "../../Types/movieTypes";
import { forwardRef } from "react";
import IconButtonComponent from "./IconButtonComponent";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import zIndex from "@mui/material/styles/zIndex";

interface SectionCardProps {
    movie: MovieItemGenre;
    handleClicked?: (slug: string) => void;
}

const Card3Component = forwardRef<HTMLDivElement, SectionCardProps>(({ movie, handleClicked }, ref) => {
    console.log(movie);

    return (
        <Card
            sx={{
                backgroundColor: 'transparent', width: '100%', flex: { lg: '0 0 20%', xs: '0 0 50%' },
            }}
            className={`flex-none hover:cursor-pointer px-2`}
            onClick={() => handleClicked && handleClicked(movie.slug)}
            ref={ref}
        >
            <Box sx={{
                height: '300px',
                '&:hover > .card-media': {
                    height: '40%'
                },
                '&:hover > .card-media > .container-btn': {
                    display: 'block',
                    transition: 'all 0.5s ease-in-out'
                },
                '&:hover > .container-text': {
                    display: 'flex',
                    transition: 'all 0.5s ease-in-out'
                }
            }}>
                <CardMedia
                    image={movie.poster_url.includes(import.meta.env.VITE_API_IMAGE_URL)
                        ? movie.poster_url
                        : import.meta.env.VITE_API_IMAGE_URL + '/' + movie.poster_url
                    }
                    sx={{
                        height: '100%', width: '100%', objectFit: 'cover', position: 'relative',

                    }}
                    title={movie.name}
                    className="card-media transition-all duration-300 rounded-md"
                >
                    <Box className="container-btn hidden transition-all duration-500">
                        <IconButtonComponent
                            icon={<PlayArrowRoundedIcon sx={{ fontSize: '19px', padding: '0' }} />}
                            style={{
                                position: 'absolute',
                                bottom: '5%',
                                right: '20%',
                                color: 'white',
                                border: 'none',
                                width: '35px',
                                height: '35px',
                                zIndex: '20',
                                bgcolor: 'primary.main',
                                '&:hover': { bgcolor: 'secondary.dark' },
                            }}
                        />
                        <IconButtonComponent
                            icon={<BookmarkAddOutlinedIcon color="disabled" sx={{ fontSize: '16px', '&:hover': { color: 'white' } }} />}
                            style={{
                                position: 'absolute',
                                bottom: '5%',
                                right: '5%',
                                color: 'red',
                                border: 'none',
                                width: '35px',
                                height: '35px',
                                zIndex: '20',
                                bgcolor: 'white',
                                '&:hover': { bgcolor: '#c6c7c8', color: 'white' },
                            }}
                        />
                    </Box>
                    <Box className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-t from-[#111111] from-0% to-transparent to-30%"></Box>
                </CardMedia>
                <Box sx={{
                    backgroundColor: '#171717',
                    display: 'none',
                    height: '60%',
                    width: '100%',
                    paddingInline: '10px',
                    paddingBlock: '15px',
                }}
                    className="container-text flex-col gap-2"
                >
                    <Typography variant="h6" className="text-white" children={movie.name} />
                    <Box className="flex flex-wrap gap-2">
                        {movie.category.map((cate, index) => (
                            <Typography key={index} variant="body2" sx={{ backgroundColor: '#333', padding: '2px 6px', width: 'fit-content', borderRadius: '3px' }} className="text-white" children={cate.name} />
                        ))}
                    </Box>

                    <Typography variant="body2" className="text-white"
                        children={<>
                            <span className="text-[#bbb]">Số tập: </span> {movie.episode_current}
                        </>}
                    />
                    <Typography variant="body2" className="text-white" 
                    children={
                        <>
                            <span className="text-[#bbb]">Thời lượng: </span> {movie.episode_current} phút
                        </>
                    } 
                    />
                    <Typography variant="body2" className="text-white" 
                    children={
                        <>
                            <span className="text-[#bbb]">Chất lượng: </span> {movie.quality}
                        </>
                    } 
                    />

                </Box>
            </Box>


            <CardContent>
                <Typography sx={{ width: '100%', fontSize: '14px', fontWeight: 'bold', color: 'primary.contrastText' }} children={movie.name} />
            </CardContent>
        </Card>
    )
});

export default Card3Component