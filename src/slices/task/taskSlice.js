import { createSlice } from '@reduxjs/toolkit';
import data from '../../dummyData/data'

const initialState = data.tasks

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, { payload }) => {
      state.tasks[payload.newTaskId] = payload.newTask
      state.columns[payload.columnId].taskIds.push(payload.newTaskId)
      return state
		},
    deleteTask: (state, { payload }) => {
      delete state.tasks[payload.taskId]
      const index = state.columns[payload.columnId].taskIds.indexOf(payload.taskId)
      state.columns[payload.columnId].taskIds.splice(index, 1)
      return state
    },
    editTask: (state, {payload}) => {
      state.tasks[payload.taskId] = payload.editedTask
      return state
    },
  }
});

// Selectors 
export const getTasks = state => state.tasks

export const { createTask, deleteTask, editTask, } = taskSlice.actions

export default taskSlice.reducer