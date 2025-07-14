import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps): React.ReactElement {
  return (
    <div className="container-fluid">
      {children}
    </div>
  )
}