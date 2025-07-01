import React, { useState } from 'react'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { router } from './router.tsx'
import { LangContext, initialState as langInitialState } from './contexts/LangContext.ts'

export function App(): React.ReactElement {
  const [lang, setLang] = useState(langInitialState.lang)

  return (
    <Provider store={store}>
      <LangContext.Provider value={{ lang, setLang }}>
         <RouterProvider router={router} />
      </LangContext.Provider>
    </Provider>
  )
}