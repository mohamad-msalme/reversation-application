import React from 'react'

import { ThemeProvider } from './providers/ThemeProvider'
import { ReactQueryProvider } from 'providers/ReactQueryProvider'
import { ReactRouterProvider } from 'providers/ReactRouterProvider'

export const App: React.FC = () => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <ReactRouterProvider />
      </ThemeProvider>
    </ReactQueryProvider>
  )
}
