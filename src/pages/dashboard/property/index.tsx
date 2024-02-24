/* eslint-disable no-unused-vars */
import React from 'react'

import { Table } from './components/Table'
import { Outlet } from 'react-router-dom'
import { loader } from './loader'
import { Toolbar } from './components/Toolbar'
import { AlertProps } from '@mui/material'
import { useNotification } from 'hooks/useNotification'
import { useSelectionModel } from './hooks/useSelectionModel'
import './index.scss'

export type PropertyOutletContext = {
  showNotification: (msg: string, severity: AlertProps['severity']) => void
}

const Property = () => {
  const [Notification, showNotification] = useNotification()
  const [selectionModel, setSelectionModel] = useSelectionModel()
  return (
    <div className="property">
      <Toolbar selectionModel={selectionModel} />
      <Table
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        showNotification={showNotification}
      />
      <Outlet
        context={{
          showNotification
        }}
      />
      <Notification />
    </div>
  )
}
Property.loader = loader
export default Property
