import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import groupsReducer from './slices/groupsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        groups: groupsReducer
    },
  })