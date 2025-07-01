import { createBrowserRouter, Navigate } from 'react-router'
import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/layout'
import { Filmes } from './pages/Filmes'

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Filmes />, 
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
