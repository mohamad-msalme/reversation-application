import React from 'react'
import WavingHandIcon from '@mui/icons-material/WavingHand'
import { FormGroup, FormLabel, Typography } from '@mui/material'

export const Header: React.FC = () => (
  <FormGroup
    sx={theme => ({
      marginBottom: theme.spacing(4)
    })}
  >
    <Typography
      sx={theme => ({
        textWrap: 'nowrap',
        marginBottom: theme.spacing(1)
      })}
      variant="h3"
    >
      Create your account
    </Typography>
    <FormLabel
      component="legend"
      sx={theme => ({
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: theme.spacing(1)
      })}
    >
      Please enter your personal details below
      <WavingHandIcon color="primary" />
    </FormLabel>
  </FormGroup>
)
