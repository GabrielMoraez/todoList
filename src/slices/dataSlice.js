import { createSlice, current } from '@reduxjs/toolkit';
import data from '../data'

const initialState = data

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    createNewTask: (state, { payload }) => {
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
    createColumn: (state, {payload}) => {
      state.columns[payload.newColumn.id] = payload.newColumn
      state.columnOrder.push(payload.newColumn.id)
    },
    updateData: (state, { payload }) => {
      state = {
        ...state,
        columns: {
          ...state.columns,
          [payload.newColumn.id]: payload.newColumn,
        },
      }

      if (payload.oldColumn) {
        state = {
          ...state,
          columns: {
            ...state.columns,
            [payload.oldColumn.id]: payload.oldColumn,
          },
        }
      }
      return state
    },
  },
});


export const { createNewTask, deleteTask, editTask, updateData, createColumn } = dataSlice.actions

export default dataSlice.reducer