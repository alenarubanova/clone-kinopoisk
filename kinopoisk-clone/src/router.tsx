import { createBrowserRouter, Navigate } from 'react-router'
import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/layout'
import { Filmes } from './pages/Filmes'
import { Results } from './pages/Results'
import { Favorites } from './pages/Favorites'
import { Film } from './pages/Film'
import { Trends } from './pages/Trends'

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Filmes />, 
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'trends',
        element: <Trends />,
      },
      {
        path: 'movie/:id',
        element: <Film />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
