import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import logoFilm from '../../assets/img/FPT_Polytechnic.png'
import logo from "../../assets/logo.png";
import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Grow,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  styled,
  Toolbar,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import LanguageIcon from "@mui/icons-material/Language";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PersonIcon from "@mui/icons-material/Person";
import IconButtonComponent from "../Common/IconButtonComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SearchHeader, { useDebounce } from "./SearchHeader";
import SearchIcon from "@mui/icons-material/Search";
import { searchMovies } from "../../services/movieService";
import { toast } from "react-toastify";
import { MovieItemSearch } from "../../Types/movieTypes";


type Options = {
  url: string;
  title: string;
};

//style material ui
const StyleAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isScrolled",
})<{ isScrolled: boolean }>(({ isScrolled }) => ({
  background: isScrolled
    ? "rgba(17, 17, 17, 0.95)"
    : "linear-gradient(to bottom, rgba(17,17,17,0.9), rgba(17,17,17,0))",
  transition: "background 0.5s ease-in-out",
  boxShadow: "none",
}));

const options: Options[] = [
  { url: "lien-he", title: "Liên hệ" },
  { url: "gioi-thieu", title: "Giới thiệu" },
  { url: "dieu-khoan", title: "Điều khoản" },
  { url: "quy-dinh", title: "Quy định" },
  { url: "tro-giup", title: "Trợ giúp" },
];
const icons = {
  Language: <LanguageIcon sx={{ fontSize: "18px" }} />,
  download: <DownloadForOfflineIcon sx={{ fontSize: "18px" }} />,
  widgets: <WidgetsIcon sx={{ fontSize: "18px" }} />,
  person: <PersonIcon sx={{ fontSize: "18px" }} />,
};

const StyleButtons = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "hideBorder",
})<{ active?: boolean; hideBorder?: boolean }>(
  ({ theme, active, hideBorder }) => ({
    color: "white",
    fontWeight: "normal",
    height: "2rem",
    "& .MuiButton-endIcon": {
      marginRight: "-10px",
      marginLeft: "-5px",
      marginBottom: "5px",
    },
    "& .css-1gulhci-MuiButton-endIcon>*:nth-of-type(1)": {
      fontSize: "2rem",
    },
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
  })
);

const SearchContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  color: "#fff",
  borderRadius: "5px",
  width: "50%",
  height: "35px",
  transition: "all 500ms",
});
const StyleInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "classes"
})({
  width: "100%",
  height: "100%",
  padding: "0 15px",
  color: "#fff",
  transition: "all 500ms",
  backgroundColor: "transparent",
  borderRight: "1px solid white",
  "&::placeholder": {
    color: "white",
    opacity: 1,
  },
});

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();
  const genres = useSelector((state: RootState) => state.genres.genres);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // debounce 200ms
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MovieItemSearch[]>([]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!debouncedQuery.trim()) {
          setResults([]);
          return;
        }
        const res = await searchMovies(debouncedQuery);
        setResults(res.data.items || []);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        toast.error("Lỗi khi tìm kiếm. Vui lòng thử lại sau.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const handleToggle = (value: string) => {
    setMenuOpen((prev) => (prev === value ? null : value));
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setMenuOpen(null);
  };

  const handleLinkClick = () => {
    setMenuOpen(null);
  };

  const handleSearch = (value: string) => {

    setQuery(value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }
    setMenuOpen("search");
  }

  return (
    <>
      <StyleAppBar position="fixed" isScrolled={isScrolled}>
        <Toolbar className="flex justify-between items-center py-0 px-12 h-16 transition-all duration-500">
          <Box className="flex items-center">
            <Link to="/">
              <img src={logo} alt="logo" style={{ width: "50px" }} />
            </Link>
            <Box>
              <StyleButtons
                active={location.pathname == "/trang-chu"}
                children={<Link to="/trang-chu" children="Trang chủ" />}
              />
              <StyleButtons
                sx={{ position: "relative" }}
                active={location.pathname.includes("/the-loai")}
                children="Thể loại"
                onClick={() => handleToggle("genres")}
                ref={anchorRef}
                endIcon={<ArrowDropDownRoundedIcon />}
              />
              <StyleButtons
                active={location.pathname == "/phim-le"}
                children={<Link to="/phim-le" children="Phim lẻ" />}
              />
              <StyleButtons
                active={location.pathname == "/phim-bo"}
                children={<Link to="/phim-bo" children="Phim bộ" />}
              />

              <StyleButtons
                sx={{ position: "relative" }}
                hideBorder
                onClick={() => handleToggle("other")}
                ref={anchorRef}
                endIcon={<ArrowDropDownRoundedIcon />}
              >
                Khác
              </StyleButtons>

              <Popper
                open={Boolean(menuOpen)}
                anchorEl={anchorRef.current}
                role={undefined}
                sx={{ zIndex: 30 }}
              >
                <Grow
                  in={Boolean(menuOpen)}
                  style={{ transformOrigin: "0 0 0" }}
                >
                  <Paper
                    sx={{
                      zIndex: 1,
                      width: "min-content",
                      backgroundColor: "rgba(15, 17, 26, .95)",
                    }}
                    className=" mt-5 !text-[#8a8c8d]"
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      {(() => {
                        switch (menuOpen) {
                          case "genres":
                            return (
                              <Box
                                sx={{
                                  color: "#8a8c8d",
                                  p: 3,
                                  borderRadius: 2,
                                  width: "33.3333%",
                                  minWidth: 600,
                                }}
                              >
                                <Grid container spacing={2}>
                                  {genres.map((item, index) => (
                                    <Grid
                                      key={index}
                                      item
                                      xs={6}
                                      sm={4}
                                      md={3}
                                      onClick={handleLinkClick}
                                    >
                                      <MuiLink
                                        component={Link}
                                        to={`/the-loai/${item.slug
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")}`}
                                        underline="hover"
                                        color="inherit"
                                        sx={{
                                          display: "block",
                                          fontSize: "0.95rem",
                                          mb: 1,
                                          whiteSpace: "nowrap",
                                          textOverflow: "ellipsis",
                                          overflow: "hidden",
                                        }}
                                      >
                                        {item.name}
                                      </MuiLink>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Box>
                            );

                          case "other":
                            return (
                              <MenuList>
                                {options.map((option) => (
                                  <MenuItem key={option.url}>
                                    <Link to={`/${option.url}`}>
                                      {option.title}
                                    </Link>
                                  </MenuItem>
                                ))}
                              </MenuList>
                            );

                          case 'search':
                            return (
                              <Box
                                sx={{
                                  color: "#8a8c8d",
                                  p: 3,
                                  borderRadius: 2,
                                  width: "33.3333%",
                                  minWidth: 600,
                                }}
                              >
                                <SearchHeader results={results} loading={loading} handleDialog={handleLinkClick} />
                              </Box>
                            )
                          default:
                            return <></>;
                        }
                      })()}
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              </Popper>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            <SearchContainer>
              <StyleInputBase
                placeholder="Tìm kiếm..."
                ref={anchorRef}
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <SearchIcon
                sx={{
                  color: "white",
                  margin: "0 10px",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              />
            </SearchContainer>
            <Box sx={{ width: "43%" }} className="flex justify-between">
              {Object.values(icons).map((icon, index) => (
                <IconButtonComponent
                  key={index}
                  icon={icon}
                  style={{
                    bgcolor: "rgba(0, 0, 0, 0.2)",
                    color: "white",
                    width: 39,
                    height: 39,
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Toolbar>
      </StyleAppBar>
    </>
  );
};

export default Header;
