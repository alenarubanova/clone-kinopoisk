import React from 'react'
import { User } from '../user/user'
import { SearchBar } from '../search-bar/search-bar'
import style from './header.module.css'

export function Header(): React.ReactElement {
  return (
    <div className={style.header}>
      <SearchBar />
      <User userName="Alena" userSurname="Rubanova"/>
    </div>
  )
}