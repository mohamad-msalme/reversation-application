import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const HomeLayout: React.FC = () => {
  const navigate = useNavigate()
  const [isPending, startTransition] = React.useTransition()
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
    <Box sx={{ opacity: isPending ? 0.5 : 1 }}>
      <Tabs centered value={value} onChange={handleChange}>
        <Tab component={Link} label="Arrivals" to="arrivals" />
        <Tab component={Link} label="Departure" to="departure" />
        <Tab component={Link} label="Stays-over" to="staysover" />
      </Tabs>
      <Outlet />
    </Box>
  )
}

export default HomeLayout
