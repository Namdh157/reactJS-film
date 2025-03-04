import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { MovieItemGenre } from "../../Types/movieTypes";
import { forwardRef } from "react";
import IconButtonComponent from "./IconButtonComponent";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

interface SectionCardProps {
    movie: MovieItemGenre;
    handleClicked?: (slug: string) => void;
}

const Card2Component = forwardRef<HTMLDivElement, SectionCardProps>(({ movie, handleClicked }, ref) => {
    console.log(movie);

    return (
        <Card
            sx={{
                backgroundColor: 'transparent', width: '100%', flex: { lg: '0 0 25%', xs: '0 0 50%' },
                zIndex: '20',
                height: '250px',
                borderRadius: '20px',
                transform: 'scale(0.96)',
                '&:hover': {
                    transform: 'scale(1)',
                    transition: 'all 0.5s ease',
                },
                '&:hover > .card-media > .card-bg': {
                    opacity: '1',
                }
            }}
            className={`flex-none hover:cursor-pointer px-2`}
            onClick={() => handleClicked && handleClicked(movie.slug)}
            ref={ref}
        >
            <CardMedia
                image={movie.thumb_url.includes(import.meta.env.VITE_API_IMAGE_URL)
                    ? movie.thumb_url
                    : import.meta.env.VITE_API_IMAGE_URL + '/' + movie.thumb_url
                }
                sx={{ height: '70%', width: '100%', objectFit: 'cover', position: 'relative', }}
                title={movie.name}
                className="card-media transition-all duration-600"
            >

                <Box
                    className="card-bg absolute top-0 bottom-0 right-0 left-0 opacity-0 
                    bg-gradient-to-t from-[#111111] from-0% to-transparent to-30%
                    transition duration-300"
                >
                    <IconButtonComponent
                        icon={<PlayArrowRoundedIcon sx={{ fontSize: '19px', padding: '0' }} />}
                        style={{
                            position: 'absolute',
                            bottom: '5%',
                            right: '16%',
                            color: 'white',
                            border: 'none',
                            width: '30px',
                            height: '30px',
                            bgcolor: 'primary.main',
                            '&:hover': { bgcolor: 'secondary.dark' }
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
                            width: '30px',
                            height: '30px',
                            bgcolor: 'white',
                            '&:hover': { bgcolor: '#c6c7c8', color: 'white' },
                        }}
                    />
                </Box>
            </CardMedia>

            <CardContent sx={{ height: '30%', background: 'rgb(33, 35, 43)' }}>
                <Typography sx={{ width: '100%', fontSize: '14px', fontWeight: 'bold', color: 'white' }} children={movie.name} />
                <Typography sx={{ fontSize: '14px' }} children={movie.episode_current} color="primary.contrastText" />
            </CardContent>
        </Card>
    )
});

export default Card2Component