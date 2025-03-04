import { useEffect, useRef } from 'react'
import { convertYouTubeUrl } from '../../utils/convertYoutubeUrl';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

type TrailerYoutubeProps = {
    url: string;
    autoPlay?: boolean;
    hidden?: boolean;
    isPlaying?: boolean;
    onVideoEnd?: () => void;
    onVideoPlaying?: () => void;
}

const TrailerYoutube = ({ url, autoPlay = true, hidden = true, isPlaying, onVideoEnd, onVideoPlaying }: TrailerYoutubeProps) => {
    if (!url) return null;
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    console.log(hidden);

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('player', {
                height: '100%',
                width: '100%',
                zIndex: '3',
                videoId: convertYouTubeUrl(url),
                playerVars: {
                    autoplay: autoPlay ? 1 : 0,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    fs: 0,
                    mute: 1
                },
                events: {
                    onStateChange: (event: any) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            onVideoEnd && onVideoEnd();
                        } else if (event.data === window.YT.PlayerState.PLAYING) {
                            onVideoPlaying && onVideoPlaying();
                        }
                    }
                }
            });
        };

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        }
    }, []);

    useEffect(() => {
        if (playerRef.current) {
            if (containerRef.current) containerRef.current.style.display = 'block';

            playerRef.current.seekTo(0);
            playerRef.current.playVideo();
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.stopVideo();
            }
        }
    }, [isPlaying]);

    return (
        <div ref={containerRef} className={`${hidden ? 'hidden' : ''} w-full h-full absolute top-0 left-0`}>
            <div id="player" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default TrailerYoutube;
