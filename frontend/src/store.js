import { configureStore } from '@reduxjs/toolkit'
import authReducer from './store/auth/auth'
import apiReducer from './store/apiUrl/apiUrl'
import lessonReducer from './store/lesson/lesson'
import accountSReducer from "./store/mypageS/accountS";
import lessonInfoReducer from './store/lessonInfo/lessonInfo'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api : apiReducer,
    lesson : lessonReducer,
    lessonInfo : lessonInfoReducer,
    accountS: accountSReducer,

  },
});
