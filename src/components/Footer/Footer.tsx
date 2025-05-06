import imgApple from "../../assets/img/Apple.png";
import imgGoogle from "../../assets/img/Google.png";
import fptLogo from "../../assets/img/FPT_Polytechnic.png";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Instagram, Twitter } from "@mui/icons-material";
import { useSelector } from "react-redux";

const StyledTypography = styled(Typography)({
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  marginBottom: "1rem",
  marginTop: "1rem",
});

const StyleLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "12px",
  margin: "22px 0",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Footer: React.FC = () => {
  interface RootState {
    showFooter: {
      showFooter: boolean;
    };
  }

  const showFooter = useSelector(
    (state: RootState) => state.showFooter.showFooter
  );
  if (!showFooter) return null;
  return (
    <>
      <Box className="bg-black text-white p-8 px-24">
        <Box className="flex justify-between mb-4">
          <Button
            variant="outlined"
            sx={{
              borderWidth: "2px",
              borderColor: "primary.dark",
              color: "white",
              padding: "10px 15px",
              borderRadius: "6px",
            }}
          >
            Tiếng việt
          </Button>

          <Box className="flex gap-4">
            <IconButton className="!text-white">
              <FacebookOutlinedIcon fontSize="large" />
            </IconButton>
            <IconButton className="!text-white">
              <Instagram fontSize="large" />
            </IconButton>
            <IconButton className="!text-white">
              <Twitter fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Grid2
          container
          spacing={6}
          sx={(theme) => ({
            "--GridBorderWidth": "1px",
            borderTop: "var(--GridBorderWidth) solid",
            borderBottom: "var(--GridBorderWidth) solid",
            borderColor: theme.palette.primary.dark,
            padding: "10px 0",
          })}
          className="text-start !py-12"
        >
          <Grid2 size={{ xs: 12, md: 3 }}>
            <StyledTypography variant="h6">
              Giới thiệu về chúng tôi
            </StyledTypography>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Thông tin về công ty
            </StyleLink>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Giới thiệu dịch vụ sản phẩm
            </StyleLink>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <StyledTypography variant="h6">Hợp tác</StyledTypography>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Đăng quảng cáo
            </StyleLink>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Quan hệ kinh doanh
            </StyleLink>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Hợp tác cài đặt trước
            </StyleLink>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <StyledTypography variant="h6">Hỗ trợ và giúp đỡ</StyledTypography>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Phản ánh ý kiến
            </StyleLink>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Trung tâm phản hồi bảo mật
            </StyleLink>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Câu hỏi thường gặp
            </StyleLink>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <StyledTypography variant="h6">Điều khoản dịch vụ</StyledTypography>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Điều quản quyền riêng tư
            </StyleLink>
            <StyleLink to="#" className="block text-gray-400 hover:text-white">
              Điều khoản sử dụng
            </StyleLink>
          </Grid2>
        </Grid2>

        <Box className="flex flex-col items-center my-10 gap-5">
          {/* Cửa hàng ứng dụng */}
          <Box className="flex gap-4 mb-4 md:mb-0">
            <img
              src={imgApple}
              alt="App Store"
              className="w-32 cursor-pointer"
            />
            <img
              src={imgGoogle}
              alt="Google Play"
              className="w-32 cursor-pointer"
            />
          </Box>
          <Box
            sx={{ backgroundColor: "primary.contrastText" }}
            className="flex items-center justify-center w-3/12 border p-2 rounded-xs border-none"
          >
            <img src={fptLogo} alt="FPT Polytechnic" className="w-12" />
          </Box>
          <Typography sx={{ fontSize: "12px" }}>
            Tìm kiếm trong cửa hàng ứng dụng dành cho thiết bị di động
          </Typography>
        </Box>

        <Box
          sx={{ color: "primary.dark" }}
          className="text-center mt-4 text-sm"
        >
          <Typography>
            Chúng tôi sử dụng Cookies để cải thiện trải nghiệm sử dụng của bạn.
            Nếu bạn tiếp tục sử dụng trang web của chúng tôi, có nghĩa là bạn
            đồng ý chúng tôi sử dụng Cookies. Đọc Chính sách quyền riêng tư
            FptFilm
          </Typography>
          <Typography>Copyright © 2024 fptFilm. All Rights Reserved</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
