import React from 'react'
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const CreateReservationBtn: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handelClick = () => navigate(`new?${searchParams.toString()}`)

  return (
    <Button
      sx={{ flexShrink: 0 }}
      variant="contained"
      startIcon={<Add />}
      name="create"
      onClick={handelClick}
    >
      Create
    </Button>
  )
}
