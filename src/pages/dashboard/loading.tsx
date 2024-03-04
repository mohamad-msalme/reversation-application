import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

export const Loading: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%'
    }}
  >
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: theme => theme.zIndex.drawer + 1
      }}
      open
    >
      <CircularProgress color="primary" />
    </Backdrop>
  </div>
)
