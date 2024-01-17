import React from 'react'
import { Form } from './Form'
import { Header } from './Header'
import { useNavigate } from 'react-router-dom'
import { FormControl, FormGroup, Link, Typography } from '@mui/material'

const SignIn: React.FC = () => {
  const navigate = useNavigate()

  return (
    <FormControl>
      <Header />
      <Form />
      <FormGroup>
        <Typography
          variant="overline"
          sx={theme => ({
            textAlign: 'center',
            marginTop: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 1
          })}
        >
          Dont have an account?
          <Link onClick={() => navigate('/signup')}>Sign up here</Link>
        </Typography>
      </FormGroup>
    </FormControl>
  )
}

export default SignIn
