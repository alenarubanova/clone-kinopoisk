import { createBrowserRouter, Navigate } from 'react-router'
import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/layout'
import { Films } from './pages/Films'
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
        element: <Films />, 
      },
      {
        path: 'films/all/:currentPage',
        element: <Films />,
      },
      {
        path: 'films/search/:query/:currentPage',
        element: <Films />,
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: 'trends',
        element: <Trends />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'movie/:id',
        element: <Film />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
