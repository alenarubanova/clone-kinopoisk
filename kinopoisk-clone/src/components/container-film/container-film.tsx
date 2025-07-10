import React from 'react'
import style from './container-film.module.css'

interface ContainerProps {
  children: React.ReactNode
}

export function ContainerFilm({ children }: ContainerProps): React.ReactElement {
  return (
    <div className={style.container}>
      {children}
    </div>
  )
}