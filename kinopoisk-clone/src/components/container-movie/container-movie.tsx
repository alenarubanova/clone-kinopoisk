import React from 'react'
import style from './container-movie.module.css'

interface ContainerProps {
  children: React.ReactNode
}

export function ContainerMovie({ children }: ContainerProps): React.ReactElement {
  return (
    <div className={style.container}>
      {children}
    </div>
  )
}