/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import KeyIcon from '@mui/icons-material/Key'
import FileCopyIcon from '@mui/icons-material/FileCopy'

import { useQuery } from '@tanstack/react-query'
import { Box, Button } from '@mui/material'
import { isAxiosError } from 'axios'
import { KeyShowQuery } from 'services/fetchKeys'
import { useNotification } from 'hooks/useNotification'
import { useReservationCard } from './ReservationCardContext'

export const ReservationKey: React.FC = () => {
  const { reservation } = useReservationCard()
  const [enabled, setEnabled] = React.useState(false)
  const [Notification, showNotification] = useNotification()
  const { data, isLoading } = useQuery({
    ...KeyShowQuery(reservation?._id as string),
    enabled,
    throwOnError(error) {
      if (isAxiosError(error) && error.status === 401) return true
      showNotification(
        'Somthing went wrong during fetch key, please try again',
        'error'
      )
      return false
    }
  })

  const copyToClipboard = () => {
    if (!navigator.clipboard) {
      alert('Clipboard API not supported')
      return
    }

    if (!data)
      return showNotification('Please click on Show key button first', 'error')

    navigator.clipboard
      .writeText(data)
      .then(() => {
        showNotification('Key has been successfully copy', 'success')
      })
      .catch(error => {
        console.error(
          'Error happened when copy the key to cliboard::ReservationKey::copyToClipboard ',
          error
        )
        showNotification('somthing went wrong', 'error')
      })
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={1} alignItems="center" sx={{ mr: 'auto' }}>
        <KeyIcon color="primary" />
        <b>{`key: ${data ?? ''}`}</b>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button
          disabled={!data}
          onClick={copyToClipboard}
          startIcon={<FileCopyIcon />}
        >
          Copy key
        </Button>
        <Button onClick={() => setEnabled(true)} disabled={isLoading}>
          Show Key
        </Button>
      </Box>
      <Notification />
    </Box>
  )
}
