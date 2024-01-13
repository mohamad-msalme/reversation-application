import React from 'react'

import { ThemeProvider } from './providers/ThemeProvider'
import { GenericSuspanse } from 'components/suspanse'
import { ReactQueryProvider } from 'providers/ReactQueryProvider'
import { ReactRouterProvider } from 'providers/ReactRouterProvider'

export const App: React.FC = () => {
  return (
    <GenericSuspanse>
      <ReactQueryProvider>
        <ThemeProvider>
          <ReactRouterProvider />
        </ThemeProvider>
      </ReactQueryProvider>
    </GenericSuspanse>
  )
}
