import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ThemeType } from '../types'

export const initialState = {
  theme: 'day' as ThemeType,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer