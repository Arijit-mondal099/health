import { combineReducers } from "redux";
import userReducer from "../features/user/userSlice.js";
import doctorReducer from "../features/doctor/doctorSlice.js";

const rootReducer = combineReducers({
  user: userReducer,
  doctor: doctorReducer,
});

export default rootReducer;
