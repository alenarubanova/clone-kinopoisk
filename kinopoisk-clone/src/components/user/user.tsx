import React from 'react'
import { IoIosArrowDown } from "react-icons/io"
import style from './user.module.css'

interface UserProps {
  userName?: string
  userSurname?: string
}

export function User( { userName = '', userSurname = '' }: UserProps ): React.ReactElement {
  const userNameInitial = userName ? userName[0] : ''
  const userSurnameInitial = userName ? userSurname[0] : ''

  return (
    <button className={style.btn}>
      <span className={style.abbreviated}>{userNameInitial}{userSurnameInitial}</span>
      <span className={style.user}>{userName} {userSurname}</span>
      <IoIosArrowDown color="grey"/>
    </button>
  )
}