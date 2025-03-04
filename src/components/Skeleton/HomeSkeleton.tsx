import { Box, Grid, Grid2, Skeleton } from '@mui/material'

const skeletonStyle = {
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
}
const HomeSkeleton = () => {
    return (
        <Box className="flex gap-4 bg-black h-screen p-4 items-start ps-20 pt-32 flex-col">
            {/* Ảnh Poster */}
            <Skeleton sx={skeletonStyle} variant="rectangular" width={180} height={270} />

            {/* Thông tin phim */}
            <Box className="flex flex-col gap-2 w-8/12">
                <Skeleton sx={skeletonStyle} variant="text" width="50%" height={32} />
                <Skeleton sx={skeletonStyle} variant="text" width="80%" height={24} />
                <Skeleton sx={skeletonStyle} variant="text" width="70%" height={24} />
                <Skeleton sx={skeletonStyle} variant="rectangular" width="60%" height={40} />
            </Box>
            <Grid2 container spacing={8} className="w-full">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                        <Skeleton sx={skeletonStyle} variant="rectangular" width="100%" height={200} />
                    </Grid>
                ))}
            </Grid2>

        </Box>
    )
}

export default HomeSkeleton