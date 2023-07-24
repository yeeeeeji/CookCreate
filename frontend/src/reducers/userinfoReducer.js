import { LOGIN, LOGOUT } from "../constant";

const initialState = {
  isLogin : false,
  token : null,
  nickname : ""
}

const userinfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log(action.payload)
      return {...state, isLogin : true, token : action.payload.token, nickname : action.payload.nickname}
    case LOGOUT:
      return {...state, isLogin : false, token : null, nickname : ""}
    default:
      return state
  }
}

export default userinfoReducer;
