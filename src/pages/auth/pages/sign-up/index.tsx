import React from 'react'

import { Form } from './Form'
import { Header } from './Header'
import { useNavigate } from 'react-router-dom'
import { FormControl, FormGroup, Link, Typography } from '@mui/material'

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  return (
    <FormControl>
      <Header />
      <Form />
      <FormGroup>
        <Typography
          variant="overline"
          sx={theme => ({
            marginTop: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 1
          })}
        >
          Already have an account?
          <Link onClick={() => navigate('/login', { state: 'SignUp' })}>
            Sign in here
          </Link>
        </Typography>
      </FormGroup>
    </FormControl>
  )
}

export default SignUp
