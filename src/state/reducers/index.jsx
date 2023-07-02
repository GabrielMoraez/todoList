import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from './auth/slice'
import { boardReducer } from './board/slice'
import { columnReducer } from "./column/slice"
import { taskReducer } from "./task/slice"


const rootReducer = combineReducers({
  auth: authReducer,
  boards: boardReducer,
  columns: columnReducer,
  tasks: taskReducer
})

export default rootReducer