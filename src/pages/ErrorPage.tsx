import React from 'react'
import { isAxiosError } from 'axios'
import { Navigate, useRouteError } from 'react-router-dom'
import { Typography, Container, Grid, Button } from '@mui/material' // Import Material-UI components

const ErrorPage = () => {
  const error = useRouteError()
  let message = 'Something went wrong'
  if (isAxiosError<{ errors: { message: string }[] }>(error)) {
    if (error.response?.status === 401) {
      return <Navigate to={'/login'} />
    }
    message = error.response?.data.errors?.[0]?.message ?? message
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Grid container justifyContent="center" sx={{ textAlign: 'center' }}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom color="error">
            Oops!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sorry, an unexpected error has occurred.
          </Typography>
          <Typography variant="body1">
            <i>{message}</i>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ErrorPage
