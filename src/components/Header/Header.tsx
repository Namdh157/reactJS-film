import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
// import logoFilm from '../../assets/img/FPT_Polytechnic.png'
import logo from '../../assets/logo.png'
import { AppBar, Box, Button, ClickAwayListener, Grow, InputBase, MenuItem, MenuList, Paper, Popper, styled, Toolbar } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LanguageIcon from '@mui/icons-material/Language';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import WidgetsIcon from '@mui/icons-material/Widgets';
import PersonIcon from '@mui/icons-material/Person';
import IconButtonComponent from "../Common/IconButtonComponent";

//style material ui
const StyleAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})
  <{ isScrolled: boolean }>
  (({ isScrolled }) => ({
    background: isScrolled
      ? "rgba(17, 17, 17, 0.95)"
      : "linear-gradient(to bottom, rgba(17,17,17,0.9), rgba(17,17,17,0))",
    transition: "background 0.5s ease-in-out",
    boxShadow: 'none',
  }));

const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  color: '#fff',
  borderRadius: '5px',
  width: '50%',
  height: '35px',
  transition: 'all 500ms',
});

const StyleInputBase = styled(InputBase)({
  width: '100%',
  height: '100%',
  padding: '0 15px',
  color: '#fff',
  transition: 'all 500ms',
  backgroundColor: 'transparent',
  borderRight: '1px solid white',
  "&::placeholder": {
    color: "white",
    opacity: 1,
  },
})

type Options = {
  url: string;
  title: string;
}
const options: Options[] = [
  { url: 'lien-he', title: 'Liên hệ' },
  { url: 'gioi-thieu', title: 'Giới thiệu' },
  { url: 'dieu-khoan', title: 'Điều khoản' },
  { url: 'quy-dinh', title: 'Quy định' },
  { url: 'tro-giup', title: 'Trợ giúp' },
]
const icons = {
  Language: <LanguageIcon sx={{ fontSize: '18px' }} />,
  download: <DownloadForOfflineIcon sx={{ fontSize: '18px' }} />,
  widgets: <WidgetsIcon sx={{ fontSize: '18px' }} />,
  person: <PersonIcon sx={{ fontSize: '18px' }} />
}

const StyleButtons = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "hideBorder",
})
  <{ active?: boolean, hideBorder?: boolean }>(({ theme, active, hideBorder }) =>
  ({
    color: 'white',
    fontWeight: 'normal',
    "&::after": {
      content: '""',
      position: "absolute",
      left: "50%",
      bottom: 0,
      width: active ? "60%" : "0%",
      height: "3px",
      backgroundColor: theme.palette.primary.main,
      transform: "translateX(-50%)",
      transition: "width 0.3s ease-in-out",
    },
    "&:hover::after": hideBorder
      ? {} 
      : {
        width: "60%",
      },
  }))


const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleToggle = () => {
    setOpen(prev => !prev);
  }

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  }

  return (
    <>
      <StyleAppBar position='fixed' isScrolled={isScrolled}>
        <Toolbar className="flex justify-between items-center py-0 px-12 h-16 transition-all duration-500">
          <Box className="flex items-center">
            <Link to='/'>
              <img src={logo} alt='logo' style={{ width: '50px', }} />
            </Link>
            <Box>
              <StyleButtons active={(location.pathname == '/trang-chu')} children={<Link to='/trang-chu' children='Trang chủ' />} />
              <StyleButtons active={location.pathname == '/the-loại/:theloai'} children={<Link to='/the-loại/:theloai' children='Thể loại' />} />
              <StyleButtons active={location.pathname == '/phim-le'} children={<Link to='/phim-le' children='Phim lẻ' />} />
              <StyleButtons active={location.pathname == '/phim-bo'} children={<Link to='/phim-bo' children='Phim bộ' />} />

              <StyleButtons
                sx={{ position: "relative", }}
                hideBorder
                onClick={handleToggle}
                ref={anchorRef}
                endIcon={<ArrowDropDownIcon />}
              >
                Khác
              </StyleButtons>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                sx={{ zIndex: 30 }}
              >
                <Grow in={open}>
                  <Paper
                    sx={{ zIndex: 1, }}
                    className="pe-6 mt-5 !bg-black !text-[#8a8c8d]"
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList>
                        {options.map((option, _) => (
                          <MenuItem
                            key={option.url}
                          >
                            <Link to={`/${option.url}`}>{option.title}</Link>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              </Popper>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '40%' }}>
            <SearchContainer>
              <StyleInputBase placeholder='Tìm kiếm...' />
              <SearchIcon sx={{ color: 'white', margin: '0 10px', fontWeight: 'bold', fontSize: '22px' }} />
            </SearchContainer>

            <Box sx={{ width: '43%' }} className="flex justify-between">
              {Object.values(icons).map((icon, index) => (
                <IconButtonComponent
                  key={index}
                  icon={icon}
                  style={{
                    bgcolor: 'rgba(0, 0, 0, 0.2)',
                    color: 'white',
                    width: 39,
                    height: 39,
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Toolbar>
      </StyleAppBar >

    </>
  )
}

export default Header