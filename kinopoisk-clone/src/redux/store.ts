import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { moviesReducer } from './films-slice'
import { langReducer } from './lang-slice'
import { filmReducer } from './film-slice'
import { tabsReducer } from './tabs-slice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    lang: langReducer,
    film: filmReducer,
    tabs: tabsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()