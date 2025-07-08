import React, { type ChangeEvent } from 'react'
import { NavLink } from 'react-router'
import { useAppSelector, useAppDispatch } from '../../redux/store'
import { setLang } from '../../redux/lang-slice'
import { locales } from '../../config/locales'
import style from './sidebar.module.css'
import LogoDay from '../../assets/logo/pixema-day.svg'
import LogoNight from '../../assets/logo/pixema-night.svg'
import { Theme } from '../theme/theme'
import { ImHome } from 'react-icons/im'
import { FaFire } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { IoSettingsSharp } from 'react-icons/io5'

export function Sidebar(): React.ReactElement {
  const lang = useAppSelector(state => state.lang.lang)
  const dispatch = useAppDispatch()

  function handleChangeLang(event: ChangeEvent<HTMLSelectElement>): void {
    dispatch(setLang(event.target.value as 'en' | 'ru'))
  }

  return (
    <aside className={style.sidebar}>
      <nav className={style.nav}>
        <div className={style.container}>
          <a href="#" className={style.link}>
            <img src={LogoDay} alt="Logo" className={style.img} />
          </a>
          <ul className={style.navbar}>
            <li className={style.item}>
              <NavLink to="/" className={({ isActive }) => (isActive ? `${style.link}` : `${style.link}`)}>
                <ImHome color="grey" /> {locales[lang].header.home}
              </NavLink>
            </li>
            <li className={style.item}>
              <a href="#" className={style.link}>
                <FaFire color="grey" /> {locales[lang].header.trends}
              </a>
            </li>
            <li className={style.item}>
              <NavLink to="/favorites" className={({ isActive }) => (isActive ? `${style.link}` : `${style.link}`)}>
                <MdFavorite color="grey" /> {locales[lang].header.favorites}
              </NavLink>
            </li>
            <li className={style.item}>
              <a href="#" className={style.link}>
                <IoSettingsSharp color="grey" /> {locales[lang].header.settings}
              </a>
            </li>
            <li className={style.item}>
              <Theme />
            </li>
            <li className={style.item}>
              <select className={style.select} onChange={handleChangeLang} value={lang}>
                <option value="en">EN</option>
                <option value="ru">RU</option>
              </select>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}