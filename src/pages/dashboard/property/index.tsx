import React from 'react'

import { Table } from './components/Table'
import { Outlet } from 'react-router-dom'
import { Toolbar } from './components/Toolbar'
import { useSelectionModel } from './hooks/useSelectionModel'

import './index.scss'

const Property: React.FC = () => {
  const [selectionModel, setSelectionModel] = useSelectionModel()
  return (
    <div className="property">
      <Toolbar selectionModel={selectionModel} />
      <Table
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
      <Outlet />
    </div>
  )
}

export default Property
