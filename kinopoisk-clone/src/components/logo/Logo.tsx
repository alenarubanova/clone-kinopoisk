import { useAppSelector } from '../../redux/store'
import logoDay from '../../assets/logo/pixema-day.svg'
import logoNight from '../../assets/logo/pixema-night.svg'
import style from './logo.module.css'

export function Logo() {
  const theme = useAppSelector(state => state.theme.theme)
  const logoSrc = theme === 'night' ? logoNight : logoDay

  return (
    <img src={logoSrc} alt="Pixema logo" className={style.img} />
  )
} 