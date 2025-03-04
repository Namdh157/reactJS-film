import { Box, Container } from '@mui/material'
import React, { useRef, useState } from 'react'
import TrailerYoutube from '../../components/Common/TrailerYoutube'
import IconButtonComponent from '../../components/Common/IconButtonComponent'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import { Movie } from '../../Types/movieTypes';

type HomeBannerProps = {
    data: Movie | null;
}


const HomeBanner: React.FC<HomeBannerProps> = ({ data }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const replayRef = useRef<HTMLButtonElement | null>(null);

    const handlePlayVideoBanner = () => {
        setIsPlaying(prev => !prev)
    };

    const displayBtReplay = () => {
        if (replayRef.current) {
            replayRef.current.style.opacity = '1'
        };
    }
    const handlePlaying = () => {
        if (replayRef.current) replayRef.current.style.opacity = '0';
    }

    return (
        <>
            <Box className="absolute top-0 bottom-0 right-0 left-0 ">
                {/* <TrailerYoutube url={data?.trailer_url || ''} isPlaying={isPlaying} onVideoEnd={displayBtReplay} onVideoPlaying={handlePlaying} /> */}
                <img src={data?.thumb_url} className='w-full h-full object-cover' alt="Banner image" />
            </Box>
            <Box className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-t from-[#111111] from-0% to-transparent to-30%" />
            <Box className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-gradient-to-r from-[#111111] from-0% to-transparent to-40% ">
                <Container maxWidth="xl" disableGutters sx={{ height: '100%', paddingInline: '5%', paddingTop: '13%' }}>
                    <Box className="text-start text-white text-xs">
                        {data && data.poster_url && <img src={data.poster_url} className='w-64 h-56 object-contain' alt="poster image" />}
                        <p className='my-3'>
                            {data?.name} "{data?.origin_name}" - {data?.year}
                        </p>
                        <p className='w-64 line-clamp-2'>
                            {data?.content}
                        </p>
                    </Box>
                    <Box className="flex justify-between mt-5">
                        <Box className="flex fel-col gap-5">
                            <IconButtonComponent
                                icon={<PlayArrowRoundedIcon sx={{ fontSize: '35px', padding: '0' }} />}
                                style={{
                                    color: 'white',
                                    border: 'none',
                                    width: '45px',
                                    height: '45px',
                                    bgcolor: 'primary.main',
                                    '&:hover': { bgcolor: 'secondary.dark' }
                                }}
                                onClick={handlePlayVideoBanner}
                            />
                            <IconButtonComponent
                                icon={<BookmarkAddOutlinedIcon color="disabled" sx={{ fontSize: '26px', '&:hover': { color: 'white' } }} />}
                                style={{
                                    color: 'red',
                                    border: 'none',
                                    width: '45px',
                                    height: '45px',
                                    bgcolor: 'white',
                                    '&:hover': { bgcolor: '#c6c7c8', color: 'white' },
                                }}
                            />
                        </Box>
                        <IconButtonComponent
                            ref={replayRef}
                            icon={
                                <ReplayIcon sx={{ fontSize: '2rem', paddingRight: '3px' }} />
                            }
                            style={{
                                bgcolor: '#212529',
                                color: 'white',
                                border: 'none',
                                padding: '.6rem',
                                opacity: '0',
                                transition: 'all 0.5s',
                                '&:hover': { bgcolor: '#424649' },
                            }}
                            onClick={handlePlayVideoBanner}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default HomeBanner