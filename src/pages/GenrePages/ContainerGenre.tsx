import { useDispatch } from "react-redux";
import Card1Component from "../../components/Common/Card1Component";
import { GenreList } from "../../Types/genreTypes";
import { openModal } from "../../store/modalSlice";
import { useRef } from "react";
import { Pagination } from "@mui/material";
import { PaginationProps } from '@mui/material';

const ContainerGenre: React.FC<{ data: GenreList; page: number; onPageChange: (page: number) => void; }> = ({ data, page, onPageChange }) => {

  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);
  const paginateRef = useRef<HTMLDivElement>(null);

  const handleChangePage: PaginationProps['onChange'] = (_, value: number) => {
    if (value === page) return;
    
    onPageChange(value);
    if (paginateRef.current) {
      paginateRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-10">
      <div className="grid grid-cols-6">
        {data?.items?.map((movie, index) => {
          return (
            <div className="" key={movie.id ?? index}>
              <Card1Component
                movie={movie as any}
                ref={cardRef}
                handleClicked={(slug) => dispatch(openModal(slug))}
              />
            </div>
          );
        })}
      </div>
      <Pagination
        count={data?.params?.pagination?.totalPages ?? 0}
        ref={paginateRef}
        size="large"
        page={page}
        onChange={handleChangePage}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "common.white",
            borderColor: "common.white",
          },
          "& .Mui-selected": {
            backgroundColor: "common.white",
            color: "primary.main",
          },
        }}
      />
    </div>
  );
};

export default ContainerGenre;
