import { LOGIN, LOGOUT } from "../constant";

export const loginAction = (token, nickname) => {
  return {
    type : LOGIN,
    payload : {
      token,
      nickname
    }
  }
}

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};