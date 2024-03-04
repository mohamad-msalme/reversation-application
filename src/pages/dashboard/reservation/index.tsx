import React from 'react'
import { Page } from './Page'
import { Layout } from './Layout'
import { loader } from './loader'

const Reservations = () => (
  <Layout>
    <Page />
  </Layout>
)

Reservations.loader = loader
export default Reservations
