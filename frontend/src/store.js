import { configureStore } from '@reduxjs/toolkit'
import authReducer from './store/auth/auth'
import apiReducer from './store/apiUrl/apiUrl'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    api : apiReducer
  },
})