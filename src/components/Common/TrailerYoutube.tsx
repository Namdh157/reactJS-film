import { useEffect, useRef, useState } from 'react'
import { convertYouTubeUrl } from '../../utils/convertYoutubeUrl';
import { toast } from 'react-toastify';

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

const TrailerYoutube = ({ url, autoPlay = true, hidden = true, onVideoEnd, onVideoPlaying }: TrailerYoutubeProps) => {
    if (!url) return null;

    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);


    if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
        }
    }, [error])

    useEffect(() => {
        const existingScript = document.querySelector("script[src='https://www.youtube.com/iframe_api']");

        if (!existingScript) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }

        const createPlayer = () => {
            if (!playerRef.current) {
                playerRef.current = new window.YT.Player("player", {
                    height: "100%",
                    width: "100%",
                    videoId: convertYouTubeUrl(url),
                    playerVars: {
                        autoplay: autoPlay ? 1 : 0,
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        fs: 0,
                        mute: 1,
                    },
                    events: {
                        onStateChange: (event: any) => {
                            if (event.data === window.YT.PlayerState.ENDED) {
                                onVideoEnd && onVideoEnd();
                            } else if (event.data === window.YT.PlayerState.PLAYING) {
                                onVideoPlaying && onVideoPlaying();
                            }
                        },
                        onError: (event: any) => {

                            console.error("Lỗi video:", event.data);
                            if (event.data === 100) {
                                setError("Trailer không tồn tại.");
                            } else if (event.data === 101 || event.data === 150) {
                                setError("Trailer đã bị xóa hoặc bị cấm.");
                            } else {
                                setError("Trailer có lỗi xảy ra")
                            }
                        },
                    },
                });
            }
        };
        if (window.YT && window.YT.Player) {
            createPlayer();
        } else {
            window.onYouTubeIframeAPIReady = createPlayer;
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        }
    }, [hidden]);


    return (
        <>
            {!hidden && <div ref={containerRef} className=' w-full h-full absolute top-0 left-0'>
                <div id="player" style={{ width: '100%', height: '100%' }} />
            </div>}
        </>
    );
};

export default TrailerYoutube;
