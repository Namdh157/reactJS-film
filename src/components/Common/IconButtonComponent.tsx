import { IconButton } from '@mui/material'
import { forwardRef, ReactNode } from 'react'

interface IconButtonProp {
  icon: ReactNode;
  style?: object;
  onClick?: () => void;
  className?: string;
}

const IconButtonComponent = forwardRef<HTMLButtonElement, IconButtonProp>(
  ({ icon, style, onClick, className }, ref) => {
  return (
    <IconButton
      ref={ref}
      sx={{
        borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.25)',
        ...style,
      }}
      onClick={onClick}
      className={className}
    >
      {icon}
    </IconButton>
  )
})

export default IconButtonComponent