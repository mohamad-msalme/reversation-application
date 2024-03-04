/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'

import { TMode } from './EditDialog'
import { DialogContent } from '@mui/material'
import { EditDialogForm } from './EditDialogForm'
import { PropertyOutletContext } from '..'
import { PropertyLoaderResponse } from './loader'
import { useLoaderData, useOutletContext } from 'react-router-dom'

export type EditDialogContentProps = {
  mode: TMode
  handelCancel: () => void
}

export const EditDialogContent: React.FC<
  React.PropsWithChildren<EditDialogContentProps>
> = ({ mode, handelCancel }) => {
  const { showNotification } = useOutletContext<PropertyOutletContext>()
  const { success } = useLoaderData() as PropertyLoaderResponse

  React.useEffect(() => {
    if (!success) {
      showNotification('Somthing went wrong, please try again', 'error')
    }
  }, [])

  return (
    <DialogContent>
      <EditDialogForm mode={mode} handelCancel={handelCancel} />
    </DialogContent>
  )
}
