import { Box, Button, IconButton, Modal,styled, Typography } from "@mui/material";
import { MovieDetail } from "../../Types/movieTypes"
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../services/movieService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeModal } from "../../store/modalSlice";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalSkeleton from "../Skeleton/ModalSkeleton";

const StyleTyPography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    fontSize: '14px',
    paddingBlock: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        background: '#2d2f34'
    }
}))

function ModalDetail() {
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const { isOpen, slugMovie } = useSelector((state: RootState) => state.modal);
    const disPatch = useDispatch();

    useEffect(() => {
        if (slugMovie) {
            setLoading(true);
            getMovieDetail(slugMovie).then((data) => {
                setMovie(data);
            }).catch((error) => {
                console.error('Lỗi khi lấy dữ liệu', error);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [slugMovie]);

    const handleClose = () => {
        disPatch(closeModal());
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                overflowY: "auto",
                boxShadow: 24,
                p: 4,
            }}
        >

            <Box className="p-12 rounded-lg shadow-lg w-[calc(100%-100px)] bg-[rgb(32,35,41)] mx-auto mt-5s relative border-none">
                <IconButton sx={{ position: 'absolute', top: '1%', right: '1%', color: 'primary.contrastText' }} onClick={handleClose}>
                    <CloseRoundedIcon sx={{ fontSize: '30px' }} />
                </IconButton>
                {isLoading ? <>
                    <ModalSkeleton />
                </>
                    :
                    <div className="w-full h-full m-auto rounded-xs py-5">
                        <Box className="flex flex-col lg:flex-row h-[550px]">
                            <img src={movie?.movie?.thumb_url} alt={movie?.movie?.name} className="w-9/12 h-full object-cover" />
                            <Box className="w-3/12 bg-[#1a1c22] px-2 py-4 h-full">
                                <Typography variant="h5" children={movie?.movie?.name} className="pb-4 px-4 font-bold" sx={{ color: 'primary.contrastText' }} />
                                <Box className="flex gap-1">
                                    <StyleTyPography
                                        variant="h5"
                                        variantMapping={{ h5: 'span' }}
                                        sx={{
                                            flex: '2',
                                            background: '#2d2f34',
                                            color: 'primary.main'
                                        }}
                                        children="Chọn tập"
                                    />
                                    <StyleTyPography
                                        variant="h5"
                                        variantMapping={{ h5: 'span' }}
                                        sx={{
                                            flex: '3',
                                            background: '#23252b'
                                        }}
                                        onClick={() => toast.info('Chức năng đang phát triển')}
                                        children="Nội dung đặc sắc"
                                    />
                                </Box>
                                <Box className="max-h-10/12 px-4 mt-5 overflow-y-auto"
                                    sx={{ '&::-webkit-scrollbar': { display: '1px solid red' }, transition: 'all 0.5s ease-in-out' }}
                                >
                                    {movie?.episodes?.map((server) => (
                                        <Box key={server.server_name} className="flex flex-col gap-2 mb-5 items-start h-full">
                                            <Typography variant="h6"
                                                variantMapping={{ h5: 'span' }}
                                                sx={{ flex: '2', color: 'white', }}
                                                children={server.server_name}
                                            />
                                            <Box className="grid grid-cols-4 gap-2 w-full h-full">
                                                {server.server_data.map((data) => (
                                                    <Button
                                                        key={data.slug}
                                                        variant="contained"
                                                        sx={{ background: '#23252b', color: 'white', padding: '5px', textAlign: 'left' }}
                                                        children={<Link to={`/phim/xem-phim/${movie.movie.slug}/${data.slug}`} children={data.name} />}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>

                        <Box className="flex flex-col lg:flex-row justify-between gap-4 mt-6">
                            <Box className="w-6/12 mb-3">
                                <Typography variant="h4" color="white" children="Nội dung phim" sx={{ color: 'primary.contrastText', marginBottom: '2rem' }} />
                                <Typography variant="body1" color="white" children={movie?.movie?.content} className="leading-6" />
                            </Box>
                            <Box className="w-3/12">
                                <Typography variant="h4" color="white" children="Thông tin phim" sx={{ color: 'primary.contrastText', marginBottom: '2rem' }} />
                                <Box className="flex flex-col gap-2">
                                    <Typography variant="body1" color="white" children={`Thể loại: ${movie?.movie?.category.map(cate => cate.name).join(",")}`} />
                                    <Typography variant="body1" color="white" children={`Quốc gia: ${movie?.movie?.country.map(count => count.name).join(", ")}`} />
                                    <Typography variant="body1" color="white" children={`Năm: ${movie?.movie?.year}`} />
                                    <Typography variant="body1" color="white" children={`Thời lượng: ${movie?.movie?.time}`} />
                                    <Typography variant="body1" color="white" children={`Đạo diễn: ${movie?.movie?.director}`} />
                                    <Typography variant="body1" color="white" children={`Diễn viên: ${movie?.movie?.actor}`} />
                                </Box>
                            </Box>
                        </Box>
                    </div>

                }
            </Box>
        </Modal>
    )
}

export default ModalDetail