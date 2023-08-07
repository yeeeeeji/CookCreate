import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";

import authReducer from './store/auth/auth'
import apiReducer from './store/apiUrl/apiUrl'
import lessonReducer from './store/lesson/lesson'
import lessonInfoReducer from './store/lesson/lessonInfo'
import accountSReducer from "./store/mypageS/accountS";
import lessonSearchReducer from './store/lesson/lessonSearch'
import videoReducer from './store/video/video'
import screenShareReducer from './store/video/screenShare'
import cookyerVideoReducer from './store/video/cookyerVideo'
import cookieeVideoReducer from './store/video/cookieeVideo'
import videoLessonInfoReducer from './store/video/videoLessonInfo'

/** redux-persist 설정 */
const reducers = combineReducers({
  auth: authReducer,
  api: apiReducer,
  lesson: lessonReducer,
  lessonSearch : lessonSearchReducer,
  lessonInfo : lessonInfoReducer,
  accountS: accountSReducer,
  video: videoReducer,
  screenShare: screenShareReducer,
  cookyerVideo: cookyerVideoReducer,
  cookieeVideo: cookieeVideoReducer,
  videoLessonInfo: videoLessonInfoReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth', 'api', 'lesson', 'lessonSearch', 'lessonInfo',
    'accountS', 'video', 'screenShare', 'cookyerVideo', 'cookieeVideo', 'videoLessonInfo'
  ],
  blacklist: []
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store