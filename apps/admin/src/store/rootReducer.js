import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice.js";
import doctorReducer from "../features/doctor/doctorSlice.js";

const rootReducer = combineReducers({
    admin: adminReducer,
    doctor: doctorReducer,
});

export default rootReducer;