import React from 'react'
import style from './container.module.css'

interface ContainerProps {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps): React.ReactElement {
  return (
    <div className={`container-fluid ${style.container}`}>
      {children}
    </div>
  )
}