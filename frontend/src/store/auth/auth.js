import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    token: null,
    nickname: "",
    userType : null,
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isLogin = true
            state.token = payload.token
            state.nickname = payload.nickname
        },
        logout: (state) => {
            state.isLogin = false
            state.token = null
            state.nickname = ""
        },
        setUserType: (state, { payload }) => {
            console.log(payload.userType)
            state.userType = payload.userType
        },
    }
})

export const { login, logout, setUserType } = auth.actions
export default auth.reducer