import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { moviesReducer } from './movies-slice'
import { langReducer } from './lang-slice'
import { movieReducer } from './movie-slice'
import { tabsReducer } from './tabs-slice'
import { themeReducer } from './theme-slice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    lang: langReducer,
    movie: movieReducer,
    tabs: tabsReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()