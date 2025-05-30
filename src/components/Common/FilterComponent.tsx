import { Box, Button, styled, Typography, TypographyProps } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useReducer, useState } from "react";

const types = [
  {
    name: "Phim Bộ",
    slug: "phim-bo",
  },
  {
    name: "Phim Lẻ",
    slug: "phim-le",
  },
  {
    name: "Tv-shows",
    slug: "tv-shows",
  },
  {
    name: "Phim Hoạt Hình",
    slug: "phim-hoat-hinh",
  },
];
const version = [
  {
    name: "Vietsub",
    slug: "viet-sub",
  },
  {
    name: "Thuyết minh",
    slug: "thuyet-minh",
  },
  {
    name: "Lồng tiếng",
    slug: "long-tieng",
  },
];
const years = Array.from({ length: 56 }, (_, i) => `${2025 - i}`);

const TitleFilterStyled = styled("h3")(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "1rem",
  fontWeight: 600,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
}));

const ItemFilterStyled = styled(({ children, ...props }: TypographyProps) => (
  <Typography {...props} variant="body1">
    {children}
  </Typography>
))(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  cursor: "pointer",
  padding: ".2rem .4rem",
  borderRadius: ".5rem",

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

type FilterState = {
  [key: string]: string[];
};

type Action =
  | { type: "TOGGLE_VALUE"; group: string; value: string }
  | { type: "RESET_GROUP"; group: string }
  | { type: "CLEAR_ALL" };

const filterReducer = (state: FilterState, action: Action): FilterState => {
  switch (action.type) {
    case "TOGGLE_VALUE": {
      const groupValues = state[action.group] || [];
      const exists = groupValues.includes(action.value);

      if (exists && groupValues.length === 1) {
        return state;
      }

      return {
        ...state,
        [action.group]: exists
          ? groupValues.filter((v) => v !== action.value)
          : [...groupValues, action.value],
      };
    }
    case "RESET_GROUP":
      return { ...state, [action.group]: [] };

    case "CLEAR_ALL":
      return {};

    default:
      return state;
  }
};

const FilterComponent = () => {
  const genres = useSelector((state: RootState) => state.genres.genres);
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const [filterState, dispatch] = useReducer(filterReducer, {});
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showAllYears, setShowAllYears] = useState<boolean>(false);

  useEffect(() => {
   

  }, []);

  const handleToggleValue = (group: string, value: string) => {
    dispatch({ type: "TOGGLE_VALUE", group, value });
  };

  const handleFilter = () => {
    const filterParams = Object.entries(filterState)
      .map(([key, values]) => {
        if (values.length > 0) {
          return `${key}=${values.join(",")}`;
        }
        return null;
      })
      .filter(Boolean)
      .join("&");
    console.log(filterParams);


    // const url = `/tim-kiem?${filterParams}`;
    // window.location.href = url;
  }


  return (
    <div className="my-6">
      {/* bộ lọc */}
      <Box
        className="flex items-start gap-2 my-6 cursor-pointer"
        sx={{
          color: showFilter ? "primary.main" : "primary.contrastText",
        }}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        <FilterAltIcon className="" />
        <h2 className="text-sm font-semibold ">Bộ lọc</h2>
      </Box>
      {showFilter && (
        <div className=" text-white space-y-6">
          {/* Quốc gia */}
          <div className="grid grid-cols-[142px_1fr] gap-10">
            <TitleFilterStyled>Quốc gia:</TitleFilterStyled>
            <div className="flex flex-wrap gap-5 items-center ms-4">
              <ItemFilterStyled
                onClick={() =>
                  dispatch({ type: "RESET_GROUP", group: "country" })
                }
                sx={{
                  color: filterState.country?.length > 0 ? "" : "primary.main",
                }}
              >
                Tất cả
              </ItemFilterStyled>
              {countries.map((item, i) => (
                <ItemFilterStyled
                  onClick={handleToggleValue.bind(null, "country", item.slug)}
                  sx={{
                    color: filterState.country?.includes(item.slug)
                      ? "primary.main"
                      : "",
                  }}
                  key={i}
                >
                  {item.name}
                </ItemFilterStyled>
              ))}
            </div>
          </div>

          {/* Loại phim */}
          <div className="grid grid-cols-[142px_1fr] gap-10">
            <TitleFilterStyled>Loại phim:</TitleFilterStyled>
            <div className="flex flex-wrap gap-5 items-center ms-4">
              <ItemFilterStyled
                onClick={() => dispatch({ type: "RESET_GROUP", group: "type" })}
                sx={{
                  color: filterState.type?.length > 0 ? "" : "primary.main",
                }}
              >
                Tất cả
              </ItemFilterStyled>
              {types.map((item, i) => (
                <ItemFilterStyled
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_VALUE",
                      group: "type",
                      value: item.slug,
                    })
                  }
                  sx={{
                    color: filterState.type?.includes(item.slug)
                      ? "primary.main"
                      : "",
                  }}
                  key={i}
                >
                  {item.name}
                </ItemFilterStyled>
              ))}
            </div>
          </div>

          {/* Thể loại */}
          <div className="grid grid-cols-[142px_1fr] gap-10">
            <TitleFilterStyled>Thể loại:</TitleFilterStyled>
            <div className="flex flex-wrap gap-5 items-center ms-4">
              <ItemFilterStyled
                onClick={() =>
                  dispatch({ type: "RESET_GROUP", group: "genre" })
                }
                sx={{
                  color: filterState.genre?.length > 0 ? "" : "primary.main",
                }}
              >
                Tất cả
              </ItemFilterStyled>
              {genres.map((item, i) => (
                <ItemFilterStyled
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_VALUE",
                      group: "genre",
                      value: item.slug,
                    })
                  }
                  sx={{
                    color: filterState.genre?.includes(item.slug)
                      ? "primary.main"
                      : "",
                  }}
                  key={i}
                >
                  {item.name}
                </ItemFilterStyled>
              ))}
            </div>
          </div>

          {/* phiên bản */}
          <div className="grid grid-cols-[142px_1fr] gap-10">
            <TitleFilterStyled>Phiên bản:</TitleFilterStyled>
            <div className="flex flex-wrap gap-5 items-center ms-4">
              <ItemFilterStyled
                onClick={() =>
                  dispatch({ type: "RESET_GROUP", group: "version" })
                }
                sx={{
                  color: filterState.version?.length > 0 ? "" : "primary.main",
                }}
              >
                Tất cả
              </ItemFilterStyled>
              {version.map((item, i) => (
                <ItemFilterStyled
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_VALUE",
                      group: "version",
                      value: item.slug,
                    })
                  }
                  sx={{
                    color: filterState.version?.includes(item.slug)
                      ? "primary.main"
                      : "",
                  }}
                  key={i}
                >
                  {item.name}
                </ItemFilterStyled>
              ))}
            </div>
          </div>

          {/* Năm sản xuất */}
          <div className="grid grid-cols-[142px_1fr] gap-10">
            <TitleFilterStyled>Năm sản xuất:</TitleFilterStyled>
            <div className="flex flex-wrap gap-5 items-center ms-4">
              <ItemFilterStyled
                onClick={() => dispatch({ type: "RESET_GROUP", group: "year" })}
                sx={{
                  color: filterState.year?.length > 0 ? "" : "primary.main",
                  marginRight: "1rem",
                }}
              >
                Tất cả
              </ItemFilterStyled>

              {(showAllYears ? years : years.slice(0, 10)).map((year, i) => (
                <ItemFilterStyled
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_VALUE",
                      group: "year",
                      value: year,
                    })
                  }
                  sx={{
                    color: filterState.year?.includes(year)
                      ? "primary.main"
                      : "",
                  }}
                  key={i}
                >
                  {year}
                </ItemFilterStyled>
              ))}
              {!showAllYears && years.length > 10 && (
                <ItemFilterStyled
                  onClick={() => {
                    setShowAllYears(true);
                  }}
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    fontWeight: 700,
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: ".5rem",
                    padding: ".2rem .8rem",
                    marginLeft: ".5rem",
                  }}
                >
                  ...
                </ItemFilterStyled>
              )}
              {showAllYears && (
                <ItemFilterStyled
                  onClick={() => setShowAllYears(false)}
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    fontWeight: 700,
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: ".5rem",
                    padding: ".2rem .8rem",
                    marginLeft: ".5rem",
                  }}
                >
                  Thu gọn
                </ItemFilterStyled>
              )}
            </div>
          </div>

          {/* Lọc kết quả */}
          <div className="grid grid-cols-[142px_1fr] gap-10">
            <div></div>
            <div className="flex flex-wrap gap-5 items-center ms-4">
              <Button
                variant="contained"
                className="px-8 py-4"
                onClick={handleFilter}
                sx={{
                  borderRadius: "2rem",
                  paddingInline: "1rem",
                  backgroundColor: "secondary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Lọc kết quả
              </Button>
              <Button
                variant="outlined"
                className="text-white px-6"
                onClick={() => {
                  setShowFilter(false);
                }}
                sx={{
                  borderRadius: "2rem",
                  borderColor: "rgba(255, 255, 255, .1)",
                  borderWidth: ".5px",
                  color: "primary.contrastText",
                  fontWeight: 600,
                }}
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
