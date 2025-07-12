import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemeType = 'day' | 'night'

interface ThemeState {
  theme: ThemeType
}

const getInitialTheme = (): ThemeType => {
  const saved = localStorage.getItem('theme')
  if (saved === 'day' || saved === 'night') return saved
  return 'day'
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    toggleTheme(state) {
      state.theme = state.theme === 'day' ? 'night' : 'day'
      localStorage.setItem('theme', state.theme)
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
