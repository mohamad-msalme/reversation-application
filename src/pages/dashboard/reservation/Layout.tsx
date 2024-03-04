import React from 'react'

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div
    style={{
      position: 'relative',
      display: 'grid',
      rowGap: '2rem',
      gridTemplateRows: 'max-content 1fr',
      height: '100%',
      gridTemplateColumns: '1fr'
    }}
  >
    {children}
  </div>
)
