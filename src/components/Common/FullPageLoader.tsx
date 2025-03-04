import { Backdrop, CircularProgress } from "@mui/material"
import React from "react";
import { useSelector } from "react-redux";

const FullPageLoader = React.memo(() => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);
  return (
    <Backdrop
      open={isLoading}
      className={`text-white flex flex-col items-center justify-center`}>
      <CircularProgress color="inherit" />
      <p>Đang tải.....</p>
    </Backdrop>
  )
})

export default FullPageLoader