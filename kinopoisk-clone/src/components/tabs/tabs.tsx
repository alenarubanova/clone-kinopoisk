import React from 'react'
import { type TabsProps } from '../../types'
import { NavLink } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setActiveTab } from '../../redux/tabs-slice'
import style from './tabs.module.css'

export const Tabs = ({ tabs }: TabsProps): React.ReactElement => {
  const activeIndex = useAppSelector(state => state.tabs.activeIndex)
  const dispatch = useAppDispatch()

  const handleToggleTab = (index: number): void => {
    dispatch(setActiveTab(index))
  }

  return (
    <ul className={style.nav}>
      {tabs.map(({ label, path }, index) => {
        const isActive = index === activeIndex
        const linkClass = `${style.link} ${isActive ? style.linkActive : style.linkInactive}`

        return (
          <li key={index} className={style.navItem}>
            <NavLink 
              to={path} 
              className={linkClass}
              onClick={() => handleToggleTab(index)}
            >
              {label}
            </NavLink>
            {index < tabs.length - 1 && (
              <span className={style.separator}>
                •
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
