import React from 'react'

import { Dialog } from '@mui/material'
import { loader } from '../property-edit-dialog/loader'
import { useDate } from './useData'
import { useNavigate } from 'react-router-dom'
import { DeleteDialogTitle } from './DeleteDialogTitle'
import { DeleteDialogAction } from './DeleteDialogAction'
import { DeleteDialogContent } from './DeleteDialogContent'

const DeleteDialog = () => {
  const data = useDate()
  const navigate = useNavigate()
  const close = () => navigate(-1)
  const [value, setValue] = React.useState('')

  const isAllowed = React.useMemo(
    () => data?.name?.trim() === value.trim(),
    [value]
  )

  return (
    <Dialog onClose={close} open={true}>
      <DeleteDialogTitle close={close} />
      <DeleteDialogContent value={value} setValue={setValue} />
      <DeleteDialogAction isAllowed={isAllowed} />
    </Dialog>
  )
}
DeleteDialog.loader = loader
export default DeleteDialog
