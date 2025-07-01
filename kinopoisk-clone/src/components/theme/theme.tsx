import {useEffect, useState} from 'react'
import style from './theme.module.css'
import '../../styles/main.scss'
import { IoSunny } from 'react-icons/io5'
import { MdNightsStay } from 'react-icons/md'

export function Theme() {
  const [isDayTheme, setIsDayTheme] = useState<boolean>(true)

  const handleClick = (): void => {
    setIsDayTheme(prev => !prev)
  }

  useEffect(() => {
    document.body.className = isDayTheme ? 'day-theme' : 'night-theme'
  }, [isDayTheme])

  const Icon = isDayTheme ? <IoSunny color="grey" className={style.img} /> : <MdNightsStay color="grey" className={style.img} />

  return (
    <button type="button" className={style.btn} onClick={handleClick}>
      {Icon}
    </button>
  )
}