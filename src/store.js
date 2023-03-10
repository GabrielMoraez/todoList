import { configureStore } from '@reduxjs/toolkit'

import boardReducer from './slices/board/boardSlice'
import columnReducer from './slices/column/columnSlice'
import taskReducer from './slices/task/taskSlice'

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    columns: columnReducer,
    tasks: taskReducer
  },
});