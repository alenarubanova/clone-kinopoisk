import { createBrowserRouter, Navigate } from 'react-router'
import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/layout'
import { Filmes } from './pages/Filmes'
import { Results } from './pages/Results'
import { Favorites } from './pages/Favorites'

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
    ],
  },
]

export const router = createBrowserRouter(routes)
