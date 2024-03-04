import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Button, Menu, MenuItem } from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export const FilterByType: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type') ?? 'all'
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (newType: string | React.SyntheticEvent) => {
    if (typeof newType === 'string') setSearchParams({ type: newType })
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {type}
      </Button>
      <Menu
        id="demo-customized-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => handleClose('all')}>All</MenuItem>
        <MenuItem onClick={() => handleClose('public')}>Public</MenuItem>
        <MenuItem onClick={() => handleClose('private')}>Private</MenuItem>
      </Menu>
    </Box>
  )
}
