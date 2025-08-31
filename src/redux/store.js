import { configureStore } from '@reduxjs/toolkit'
import shows from './showsSlice'

export const store = configureStore({
  reducer: { shows }
})
