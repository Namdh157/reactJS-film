import { useEffect, useRef, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

interface ServerData {
  name: string;
  slug: string;
  link_m3u8: string;
}
import { MovieDetail } from "../../Types/movieTypes";
import { getMovieDetail } from "../../services/movieService";
import { useParams, useSearchParams } from "react-router";
import ReactPlayer from "react-player";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loadingSlice";

const WatchMovie = () => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [srcMovie, setSrcMovie] = useState<{ link_m3u8: string }>({
    link_m3u8: "",
  });
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const serverIndex = searchParams.get("sv");
  const episodePram = searchParams.get("ep");
  const playerRef = useRef<ReactPlayer | null>(null);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimeout = useRef<number | null>(null);

  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>
  ) => {
    setSeeking(false);
    if (playerRef.current) {
      const target = e.target as HTMLInputElement;
      playerRef.current.seekTo(parseFloat(target.value));
    }
  };

  const handleNext15 = () => {
    if (playerRef.current) {
      const current = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.min(current + 15, duration));
    }
  };

  const handlePrev15 = () => {
    if (playerRef.current) {
      const current = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(current - 15, 0));
    }
  };

  const formatTime = (sec: number) => {
    if (isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleShowControls = () => {
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = window.setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handlePlayerClick = () => {
    setPlaying((prev) => !prev);
    handleShowControls();
  };

  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => setShowControls(false);

  const fetchMovie = async () => {
    try {
      dispatch(setLoading(true));
      if (name) {
        const response = await getMovieDetail(name);
        setMovie(response);
        console.log(response);

        const server = response.episodes[Number(serverIndex)];
        const src: ServerData | undefined = server?.server_data.find(
          (ep: ServerData) =>
            ep.slug.toLowerCase() === episodePram?.toLocaleLowerCase() &&
            ep.link_m3u8
        );

        if (src) setSrcMovie(src);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFullscreen = () => {
    const player = document.getElementById("player-wrapper");
    if (player) {
      if (!document.fullscreenElement) {
        player.requestFullscreen();
        setFullscreen(true);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [serverIndex, episodePram]);

  return (
    <>
      <div className="flex flex-col items-start justify-center h-20 bg-black">
        <h1 className="text-white text-2xl">{movie?.movie.name}</h1>
      </div>

      <div className="flex justify-center items-center h-[70vh] bg-black">
        <div
          id="player-wrapper"
          className="relative w-[90vw] h-[60vh] rounded-xl overflow-hidden shadow-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handlePlayerClick}
          onTouchStart={handleShowControls}
        >
          <ReactPlayer
            url={srcMovie.link_m3u8}
            controls={false}
            playing
            volume={volume}
            muted={muted}
            className="react-player"
            width="100%"
            height="100%"
            config={{
              file: {
                forceHLS: true,
              },
            }}
            onProgress={({ played }) => {
              if (!seeking) setPlayed(played);
            }}
            onDuration={setDuration}
            onEnded={() => {
              console.log("Video Ended");
            }}
          />
          {/* Custom Controller */}
          <div
            className={`absolute bottom-0 left-0 w-full flex items-center px-4 py-2 gap-4 z-20 transition-opacity duration-300
              ${
                showControls
                  ? "opacity-100 bg-black/60"
                  : "opacity-0 pointer-events-none"
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Controls */}
            <div className="flex items-center gap-4 w-full">
              {/* Prev 15s */}
              <button
                onClick={handlePrev15}
                className="text-white text-xl hover:text-red-400"
              >
                <SkipPreviousIcon fontSize="inherit" />
                <span className="text-xs ml-1">15s</span>
              </button>
              {/* Play/Pause */}
              <button
                onClick={() => setPlaying((p) => !p)}
                className="text-white text-xl hover:text-red-400"
              >
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
              </button>
              {/* Next 15s */}
              <button
                onClick={handleNext15}
                className="text-white text-xl hover:text-red-400"
              >
                <SkipNextIcon fontSize="inherit" />
                <span className="text-xs ml-1">15s</span>
              </button>
              {/* Volume */}
              <button
                onClick={() => setMuted((m) => !m)}
                className="text-white text-xl hover:text-red-400"
              >
                {muted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setMuted(Number(e.target.value) === 0);
                }}
                className="w-24 accent-red-400 hover:cursor-pointer hover:bg-red-500"
              />
              {/* Seekbar */}
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-white w-12">
                  {formatTime(played * duration)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={played}
                  onMouseDown={handleSeekMouseDown}
                  onMouseUp={handleSeekMouseUp}
                  onTouchStart={handleSeekMouseDown}
                  onTouchEnd={handleSeekMouseUp}
                  className="flex-1 accent-red-400"
                />
                <span className="text-xs text-white w-12 text-right">
                  {formatTime(duration)}
                </span>
              </div>
              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                className="ml-auto text-white text-xl hover:text-red-400"
              >
                {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white min-h-screen p-8">
        {/* Movie Header */}
        <div className="grid grid-cols-8 gap-2">
          <img
            src={movie?.movie.poster_url}
            alt="Movie Poster"
            className="w-40 h-60 rounded-lg shadow-lg"
          />
          <div className="col-span-3">
            <h1 className="text-2xl font-bold">{movie?.movie.name}</h1>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              {movie?.movie.origin_name}
            </Typography>
            <div className="flex gap-2 mt-2">
              <Typography
                variant="body2"
                sx={{
                  border: "2px solid #dc3545",
                  bgcolor: "grey.700",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                }}
              >
                IMDB 8.4
              </Typography>
              <span className="bg-gray-800 px-2 py-1 rounded">
                Tổng {movie?.movie.episode_total} tập
              </span>
              <span className="bg-gray-800 px-2 py-1 rounded">
                {movie?.movie.year}
              </span>
              <span className="bg-gray-800 px-2 py-1 rounded">
                {movie?.movie.episode_current}
              </span>
            </div>
            <Typography variant="h6" children="Thể loại" />
            <div className="flex gap-2 mt-2">
              {movie?.movie.category.map((cat, index) => (
                <span key={index} className="bg-gray-800 px-2 py-1 rounded">
                  {cat.name}
                </span>
              ))}
            </div>
            <Typography variant="h6" children="Quốc gia" />
            <div className="flex gap-2 mt-2">
              {movie?.movie.country.map((country, index) => (
                <span key={index} className="bg-gray-800 px-2 py-1 rounded">
                  {country.name}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-4 pt-5">
            <p
              className="text-sm mt-4"
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                lineHeight: "1.5",
              }}
            >
              {movie?.movie.content}
            </p>
          </div>
        </div>

        {/* Episodes List */}
        <div className="mt-6 flex flex-col gap-3">
          <h2 className="text-xl font-bold">Danh sách server & tập phim</h2>
          {movie?.episodes.map((server, indexServer) => (
            <div key={indexServer} className="p-4 rounded-lg">
              <h4 className="my-3">{server?.server_name}</h4>
              <div className="grid grid-cols-6 gap-6">
                {server?.server_data.map((episode, index) => (
                  <Button
                    key={index}
                    sx={{
                      ...(Number(serverIndex) === indexServer &&
                      String(episodePram) === episode.slug
                        ? {
                            color: "white",
                            bgcolor: "primary.main",
                            fontWeight: "bold",
                          }
                        : { color: "white", bgcolor: "grey.700" }),
                    }}
                    variant="contained"
                  >
                    <Link
                      to={`/phim/xem-phim/${name}?sv=${indexServer}&ep=${episode.slug}`}
                      className="px-4 py-2"
                    >
                      {episode.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Bình luận (14)</h2>
          <p className="text-gray-400">
            Vui lòng{" "}
            <a href="#" className="text-yellow-400">
              đăng nhập
            </a>{" "}
            để tham gia bình luận.
          </p>
          <textarea
            className="w-full mt-2 p-2 bg-gray-800 rounded border border-gray-600"
            placeholder="Viết bình luận"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default WatchMovie;
