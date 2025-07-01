import { createContext } from 'react'

interface LangContextType {
  lang: string,
  setLang: (lang: string) => void
}

export const initialState: LangContextType = {
  lang: 'en',
  setLang: () => {},
}

export const LangContext = createContext(initialState)