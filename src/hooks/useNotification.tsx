import React from 'react'
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { Alert, AlertProps, Slide, SlideProps } from '@mui/material'

export interface SnackbarMessage {
  message: React.ReactNode
  key: number
}

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="down" />
)

export const useNotification = () => {
  const msgRef = React.useRef<React.ReactNode>()
  const keyRef = React.useRef(new Date().getTime())
  const [open, setOpen] = React.useState(false)
  const refSeverity = React.useRef<AlertProps['severity']>('success')
  const handleClick = React.useCallback(
    (msg: string, severity: AlertProps['severity']) => {
      refSeverity.current = severity
      msgRef.current = msg
      keyRef.current = new Date().getTime()
      setOpen(true)
    },
    []
  )

  const handleClose = React.useCallback(
    (e: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        //
        return
      }
      setOpen(false)
    },
    []
  )

  const Action = React.useCallback(
    () => (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    ),
    [handleClose]
  )

  const Notification = React.useCallback<
    React.FC<{ alertProps?: AlertProps; snackbarProps?: SnackbarProps }>
  >(
    ({ alertProps, snackbarProps }) => (
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        TransitionComponent={SlideTransition}
        {...snackbarProps}
        action={<Action />}
        key={keyRef.current}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          sx={{ width: '100%' }}
          {...alertProps}
          severity={refSeverity.current}
          onClose={handleClose}
        >
          {msgRef.current}
        </Alert>
      </Snackbar>
    ),
    [Action, handleClose, open]
  )

  return [Notification, handleClick] as const
}
