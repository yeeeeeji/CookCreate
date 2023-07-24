import {COOKIEE, COOKYER } from "../constant"

const initialState = {
    userType : null
}

const userType = (state = initialState, action) => {
  switch (action.type) {
    case COOKYER:
      console.log(action.payload)
      return {...state, userType : action.payload}
    case COOKIEE:
      return {...state, userType : action.payload}
    default:
      return state
  }
}

export default userType