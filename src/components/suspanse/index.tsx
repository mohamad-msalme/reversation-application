import React from 'react'
import { Spinner } from 'components/spinner'

export const GenericSuspanse: React.FC<React.PropsWithChildren> = ({
  children
}) => <React.Suspense fallback={<Spinner />}>{children}</React.Suspense>
