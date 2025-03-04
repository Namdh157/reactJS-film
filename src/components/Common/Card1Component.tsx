import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { MovieItemGenre } from "../../Types/movieTypes";
import { forwardRef } from "react";

interface SectionCardProps {
    movie: MovieItemGenre;
    handleClicked?: (slug: string) => void;
}

const Card1Component = forwardRef<HTMLDivElement, SectionCardProps>(({ movie, handleClicked }, ref) => {
    return (
        <Card
            sx={{
                backgroundColor: 'transparent', width: '100%', flex: { lg: '0 0 16.66667%', md: '0 0 25%', xs: '0 0 33.33333%' },
            }}
            className={`flex-none hover:cursor-pointer px-2`}
            onClick={() => handleClicked && handleClicked(movie.slug)}
            ref={ref}
        >
            <CardMedia
                image={movie.poster_url.includes(import.meta.env.VITE_API_IMAGE_URL)
                    ? movie.poster_url
                    : import.meta.env.VITE_API_IMAGE_URL + '/' + movie.poster_url
                }
                sx={{ height: '300px', width: '100%', objectFit: 'cover', position: 'relative', }}
                title={movie.name}
                className="transition-all duration-300 rounded-md"
            >
                <Box className="absolute bottom-0 left-0 bg-opacity-50 text-white p-2">
                    <Typography sx={{ fontSize: '14px' }} children={movie.origin_name} />
                    <Typography sx={{ fontSize: '12px' }} children={movie.year} />
                </Box>

                <Box className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-t from-[#111111] from-0% to-transparent to-30%"></Box>
            </CardMedia>

            <CardContent>
                <Typography sx={{ width: '100%', fontSize: '14px', fontWeight: 'bold', color: 'primary.contrastText' }} children={movie.name} />
            </CardContent>
        </Card>
    )
});

export default Card1Component;