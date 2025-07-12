import React from 'react'
import { ContainerTrends } from '../components/container-trends/container-trends'
import { useAppSelector } from '../redux/store'
import { locales } from '../config/locales'
import style from '../styles/main.module.css'

export function Trends(): React.ReactElement {
  const lang = useAppSelector(state => state.lang.lang)

  return (
    <>
      <h1 className={style.title}>{locales[lang].trends.title}</h1>
      <ContainerTrends />
    </>
  )
}