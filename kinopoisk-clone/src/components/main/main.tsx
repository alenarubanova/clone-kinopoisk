import React from 'react'

interface MainProps {
  children?: React.ReactNode
}

export function Main( { children }: MainProps): React.ReactElement {
  return (
    <main className="flex-grow-1">
      {children}
    </main>
  )
}