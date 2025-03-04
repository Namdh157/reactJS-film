import { Skeleton } from '@mui/material'

const ModalSkeleton = () => {
  return (
    <div className="w-full h-full m-auto rounded-xs py-5">
    <Skeleton animation="wave" variant="rectangular" width="100%" height={550} className="rounded-lg" />
    <Skeleton animation="wave" variant="rectangular" width="100%" height={50} className="rounded-lg mt-5" />
</div>
  )
}

export default ModalSkeleton