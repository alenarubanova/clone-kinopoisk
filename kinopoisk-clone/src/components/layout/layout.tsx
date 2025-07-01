import React from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from '../sidebar/sidebar'
import { Main } from '../main/main'
import { Container } from '../container/container'
import { SearchBar } from '../search-bar/search-bar'
import style from './layout.module.css'

export function Layout(): React.ReactElement {
  return (
    <div className={style.container}>
      <div className="d-flex flex-row">
        <Sidebar />
        <div className="d-flex flex-column flex-grow-1">
          <SearchBar />
          <Container>
            <Main>
              <Outlet />
            </Main>
          </Container>
        </div>
      </div>
    </div>
  )
}