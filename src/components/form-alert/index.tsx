import React from 'react'
import { Alert, AlertProps } from '@mui/material'
//
export const FormAlert: React.FC<AlertProps> = ({ children, ...alertProps }) =>
  children ? <Alert {...alertProps}>{children}</Alert> : null
