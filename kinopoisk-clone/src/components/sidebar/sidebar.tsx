import React, { useContext, type ChangeEvent } from 'react'
import { NavLink } from 'react-router'
import { LangContext } from '../../contexts/LangContext'
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
  const { lang, setLang } = useContext(LangContext)

  function handleChangeLang(event: ChangeEvent<HTMLSelectElement>): void {
    setLang(event.target.value)
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
              <a href="#" className={style.link}>
                <MdFavorite color="grey" /> {locales[lang].header.favorites}
              </a>
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