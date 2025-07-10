import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface TabsState {
  activeIndex: number
}

const initialState: TabsState = {
  activeIndex: 1
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload
    }
  }
})

export const { setActiveTab } = tabsSlice.actions
export const tabsReducer = tabsSlice.reducer 