import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: 1,
      staleTime: 30_000
    }
  }
})

export const ReactQueryProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
