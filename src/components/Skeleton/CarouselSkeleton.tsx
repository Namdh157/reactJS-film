import { Box, Skeleton } from '@mui/material'

const skeletonStyle = {
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
}
const CarouselSkeleton = () => {
    return (
        <>
            <div className="py-5 max-w-[92%]">
                <Skeleton sx={skeletonStyle} variant='text' width="26%" height={55} />
                <Box
                    className="flex flex-nowrap transition-all"
                >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            variant='rectangular'
                            key={index}
                            animation='wave'
                            height="300px"
                            sx={{
                                ...skeletonStyle,
                                flex: '0 0 33.33333%',
                                '@media (min-width: 600px)': {
                                    flex: '0 0 25%',
                                },
                                '@media (min-width: 1200px)': {
                                    flex: '0 0 16.66667%',
                                },
                                margin: '0 8px',
                            }}
                        />
                    ))}
                </Box>
            </div>
        </>
    )
}

export default CarouselSkeleton