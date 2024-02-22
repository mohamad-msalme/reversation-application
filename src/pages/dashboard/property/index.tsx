import React from 'react'

import { Table } from './components/Table'
import { Outlet } from 'react-router-dom'
import { Toolbar } from './components/Toolbar'
import { useSelectionModel } from './hooks/useSelectionModel'
import './index.scss'

import { AlertProps } from '@mui/material'
import { useNotification } from 'hooks/useNotification'
export type PropertyOutletContext = {
  showNotification: (msg: string, severity: AlertProps['severity']) => void
}

const Property: React.FC = () => {
  const [selectionModel, setSelectionModel] = useSelectionModel()
  const [Notification, showNotification] = useNotification()
  return (
    <div className="property">
      <Toolbar selectionModel={selectionModel} />
      <Table
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
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

export default Property
