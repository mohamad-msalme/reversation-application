import React from 'react'
import clsx from 'clsx'
import { CircularProgress, CircularProgressProps } from '@mui/material'
import './index.scss'

type TSpinner = {
  circularProgressProps?: CircularProgressProps
  boxClassName?: string
}

export const Spinner: React.FC<TSpinner> = ({
  circularProgressProps,
  boxClassName
}) => (
  <div className={clsx('spinner', boxClassName)}>
    <CircularProgress {...circularProgressProps} />
  </div>
)
