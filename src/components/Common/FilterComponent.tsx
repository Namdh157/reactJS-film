import { Button, styled, Typography, TypographyProps } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useReducer } from "react";

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

  const handleToggleValue = (group: string, value: string) => {
    dispatch({ type: "TOGGLE_VALUE", group, value });

  };

  console.log(filterState);

  return (
    <>
      {/* bộ lọc */}
      <div className="flex items-start gap-2 my-6 cursor-pointer">
        <FilterAltIcon className="text-white" />
        <h2 className="text-sm font-semibold text-white">Bộ lọc</h2>
      </div>
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
                border:
                  filterState.country?.length > 0
                    ? "none"
                    : "1px solid  rgba(255, 255, 255, .1)",
                color: filterState.country?.length > 0 ? "" : "primary.main",
              }}
            >
              Tất cả
            </ItemFilterStyled>
            {countries.map((item, i) => (
              <ItemFilterStyled
                onClick={handleToggleValue.bind(null, "country", item.slug)}
                sx={{
                  border: filterState.country?.includes(item.slug)
                    ? "1px solid  rgba(255, 255, 255, .1)"
                    : "none",
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
                border:
                  filterState.type?.length > 0
                    ? "none"
                    : "1px solid  rgba(255, 255, 255, .1)",
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
                  border: filterState.type?.includes(item.slug)
                    ? "1px solid  rgba(255, 255, 255, .1)"
                    : "none",
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
              onClick={() => dispatch({ type: "RESET_GROUP", group: "genre" })}
              sx={{
                border:
                  filterState.genre?.length > 0
                    ? "none"
                    : "1px solid  rgba(255, 255, 255, .1)",
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
                  border: filterState.genre?.includes(item.slug)
                    ? "1px solid  rgba(255, 255, 255, .1)"
                    : "none",
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
                border:
                  filterState.version?.length > 0
                    ? "none"
                    : "1px solid  rgba(255, 255, 255, .1)",
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
                  border: filterState.version?.includes(item.slug)
                    ? "1px solid  rgba(255, 255, 255, .1)"
                    : "none",
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
                border:
                  filterState.year?.length > 0
                    ? "none"
                    : "1px solid  rgba(255, 255, 255, .1)",
                color: filterState.year?.length > 0 ? "" : "primary.main",
              }}
            >
              Tất cả
            </ItemFilterStyled>
            {years.map((year, i) => (
              <ItemFilterStyled
                onClick={() =>
                  dispatch({
                    type: "TOGGLE_VALUE",
                    group: "year",
                    value: year,
                  })
                }
                sx={{
                  border: filterState.year?.includes(year)
                    ? "1px solid  rgba(255, 255, 255, .1)"
                    : "none",
                  color: filterState.year?.includes(year) ? "primary.main" : "",
                }}
                key={i}
              >
                {year}
              </ItemFilterStyled>
            ))}
          </div>
        </div>

        {/* Sắp xếp & Hành động */}
        <div className="grid grid-cols-[142px_1fr] gap-10">
          <div></div>
          <div className="flex flex-wrap gap-5 items-center ms-4">
            <Button
              variant="contained"
              className="px-8 py-4"
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
    </>
  );
};

export default FilterComponent;
