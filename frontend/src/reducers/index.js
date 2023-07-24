import { combineReducers } from "redux";
import userinfoReducer from "./userinfoReducer";
import userTypeReducer from "./userType"; // 올바른 리듀서 이름으로 수정

const rootReducer = combineReducers({
  userinfo: userinfoReducer,
  userType: userTypeReducer, // 수정된 리듀서 이름
});

export default rootReducer;
