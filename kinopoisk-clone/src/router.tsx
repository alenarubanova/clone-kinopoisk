import { createBrowserRouter, Navigate } from 'react-router'
import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/layout'
import { Movies } from './pages/Movies'
import { Results } from './pages/Results'
import { Favorites } from './pages/Favorites'
import { Movie } from './pages/Movie'
import { Trends } from './pages/Trends'

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Movies />,
      },
      {
        path: 'movies/all/:currentPage',
        element: <Movies />,
      },
      {
        path: 'movies/search/:query/:currentPage',
        element: <Movies />,
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
        element: <Movie />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
