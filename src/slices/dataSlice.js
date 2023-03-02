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
    }
  },
});


export const { createNewTask, updateData } = dataSlice.actions

export default dataSlice.reducer