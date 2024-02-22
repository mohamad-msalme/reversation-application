import React from 'react'
import {
  Backdrop,
  BackdropProps,
  CircularProgress,
  CircularProgressProps
} from '@mui/material'
import './index.scss'

type TSpinner = {
  circularProgressProps?: CircularProgressProps
  backdropProps?: BackdropProps
}

export const Spinner: React.FC<TSpinner> = ({
  circularProgressProps,
  backdropProps
}) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
    open={true}
    {...backdropProps}
  >
    <CircularProgress color="inherit" {...circularProgressProps} />
  </Backdrop>
)
