import React from 'react'
import { loader } from './loader'
import { Link, Outlet } from 'react-router-dom'
import { Box, Tab, Tabs } from '@mui/material'
import { useNotification } from 'hooks/useNotification'

export const homeTabs: Record<number, string> = {
  0: '/home/arrivals',
  1: '/home/departure',
  2: '/home/staysover'
}
const HomeLayout = () => {
  const [value, setValue] = React.useState(0)
  const [isPending, startTransition] = React.useTransition()
  const [Notification, showNotification] = useNotification()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    startTransition(() => setValue(newValue))
  }
  return (
    <Box sx={{ opacity: isPending ? 0.5 : 1 }}>
      <Tabs centered value={value} onChange={handleChange}>
        <Tab component={Link} label="Arrivals" to="/home/arrivals" />
        <Tab component={Link} label="Departure" to="/home/departure" />
        <Tab component={Link} label="Stays-over" to="/home/staysover" />
      </Tabs>
      <Outlet context={{ tabIndex: value, showNotification }} />
      <Notification />
    </Box>
  )
}
HomeLayout.loader = loader
export default HomeLayout
