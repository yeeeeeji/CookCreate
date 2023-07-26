import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    token: null,
    id : "",
    nickname: "",
    role : null,
    emoji : ""
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isLogin = true
            state.token = payload.token
            state.nickname = payload.nickname
            state.role = payload.role
            state.id = payload.userId
            if (payload.role === 'COOKYER') {
                state.emoji = "👩‍🍳"
            } else if (payload.role === 'COOKIEE') {
                state.emoji = "🍪"
            } else {
                state.emoji = ""
            }
            localStorage.setItem('access_token', payload.token);
            localStorage.setItem('nickname', payload.nickname)
            localStorage.setItem('role', payload.role)
            localStorage.setItem('id', payload.userId)
            localStorage.setItem('emoji', state.emoji)
        },
        logout: (state) => {
            state.isLogin = false
            state.token = null
            state.nickname = ""
            state.role = null
            state.emoji = ""

        },
    }
})

export const { login, logout } = auth.actions
export default auth.reducer