import { Tab, Tabs } from '@mui/material'
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [_isPending, startTransition] = React.useTransition()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event, newValue)
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

export default Home
