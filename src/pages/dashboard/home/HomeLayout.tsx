import React from 'react'
import { Tab, Tabs } from '@mui/material'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const HomeLayout: React.FC = () => {
  const navigate = useNavigate()
  const [, startTransition] = React.useTransition()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    startTransition(() => {
      setValue(newValue)
    })
  }

  React.useEffect(() => {
    navigate('arrivals')
  }, [])

  return (
    <>
      <Tabs centered value={value} onChange={handleChange}>
        <Tab component={Link} label="Arrivals" to="arrivals" />
        <Tab component={Link} label="Departure" to="departure" />
        <Tab component={Link} label="Stays-over" to="staysover" />
      </Tabs>
      <Outlet />
    </>
  )
}

export default HomeLayout
