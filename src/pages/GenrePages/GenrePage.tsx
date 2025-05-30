import { useEffect, useState } from "react";
import { getGenresDetail } from "../../services/genreService";
import { toast } from "react-toastify";
import { GenreList } from "../../Types/genreTypes";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import ContainerGenre from "./ContainerGenre";
import FilterComponent from "../../components/Common/FilterComponent";
import GenrePageSketon from "../../components/Skeleton/GenrePageSketon";
import { useParams } from "react-router";

const GenrePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<GenreList>({} as GenreList);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      const paramsQuery = {
        type_list: slug,
        limit: 32,
        page: page,
      };
      try {
        const response = await getGenresDetail(paramsQuery);
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
  }, [slug, page]);

  return (
    <>
      <Typography
        variant="h4"
        sx={{ color: "common.white", fontWeight: "bold", mb: 2 }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "common.white",
            },
          }}
        >
          <Link underline="hover" color="common.white" href="/trang-chu">
            Trang chủ
          </Link>
          <Link
            underline="hover"
            color="common.white"
            href="/the-loai"
          >
            Thể loại
          </Link>
          <Typography sx={{ color: 'common.white' }}>{data.titlePage}</Typography>
        </Breadcrumbs>
      </Typography>

      <FilterComponent />

      {!data?.items ? (
        <GenrePageSketon />
      ) : (
        <ContainerGenre data={data} page={page} onPageChange={setPage} />
      )}
    </>
  );
};

export default GenrePage;
