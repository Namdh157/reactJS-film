import { Button, Typography } from '@mui/material'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from 'react-router-dom';
import ImageBg from "../../assets/home-background.jpg";

const LandingHomePage = () => {
  return (
    <div className="relative w-full h-screen bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${ImageBg})` }}
      ></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="bg-gray-900 bg-opacity-80 p-10 rounded-lg shadow-lg">
          <h1 className="text-white text-4xl font-bold flex items-center space-x-2">
            <Typography component="span" sx={{ color: 'primary.main', fontSize: '2.25rem', fontWeight: 'bold', marginRight: '.2rem' }}>South_Dang</Typography>Phim
          </h1>
          <p className="text-gray-300 mt-4 text-lg">
            Xem Phim Miễn Phí Cực Nhanh, Chất Lượng Cao
            <br />
            Và Cập Nhật Liên Tục
          </p>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              color: "black",
              fontWeight: "bold",
              mt: 4,
              '&:hover': { backgroundColor: "#e4606d" },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            <Link to="/trang-chu">Xem Phim Ngay</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LandingHomePage
