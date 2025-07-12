import React, { useState } from 'react'
import { ContainerTrends } from '../components/container-trends/container-trends'
import style from '../styles/main.module.css'
import { useAppSelector } from '../redux/store'
import { locales } from '../config/locales'

export function Trends(): React.ReactElement {
  const lang = useAppSelector(state => state.lang.lang)

  return (
    <>
      <h1 className={style.title}>{locales[lang].trends.title}</h1>
      <ContainerTrends />
    </>
  )
}