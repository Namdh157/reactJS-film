import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getGenresDetail } from "../../services/genreService";
import { toast } from "react-toastify";
import { GenreList } from "../../Types/genreTypes";
import { Typography } from "@mui/material";
// import ContainerGenre from "./ContainerGenre";
import FilterComponent from "../../components/Common/FilterComponent";

const GenrePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<GenreList>({} as GenreList);
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      const params = {
        type_list: slug,
        limit: 32,
      };
      try {
        const response = await getGenresDetail(params);
        setData(response.data);
      } catch (error) {
        console.error("Lấy danh sách phim thất bại", error);
        toast.error("Lấy danh sách phim thất bại");
      }
    };

    fetchData();
    return () => {
      setData({} as GenreList);
    };
  }, [slug]);

  console.log(data);

  return (
    <>
      <Typography
        variant="h4"
        sx={{ color: "common.white", fontWeight: "bold", mb: 2 }}
      >
        {data.titlePage}
      </Typography>

      <FilterComponent />

      {/* <ContainerGenre data={data} /> */}
    </>
  );
};

export default GenrePage;
