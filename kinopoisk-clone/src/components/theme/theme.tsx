import { useEffect } from 'react'
import style from './theme.module.css'
import '../../styles/main.scss'
import { IoSunny } from 'react-icons/io5'
import { MdNightsStay } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setTheme } from '../../redux/theme-slice'

export function Theme() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)

  const handleClick = () => {
    dispatch(setTheme(theme === 'day' ? 'night' : 'day'))
  }

  useEffect(() => {
    document.body.className = theme === 'day' ? 'day-theme' : 'night-theme'
  }, [theme])

  const Icon = theme === 'day'
    ? <IoSunny color="grey" className={style.img} />
    : <MdNightsStay color="grey" className={style.img} />

  return (
    <button type="button" className={style.btn} onClick={handleClick}>
      {Icon}
    </button>
  )
}