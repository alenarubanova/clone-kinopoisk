import { createBrowserRouter, Navigate } from 'react-router'
import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/layout'
import { Filmes } from './pages/Filmes'
import { Results } from './pages/Results'

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
    ],
  },
]

export const router = createBrowserRouter(routes)
