import React from 'react'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { router } from './router.tsx'

export function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}