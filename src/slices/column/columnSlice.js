import { createSlice, current } from '@reduxjs/toolkit';
import data from '../../dummyData/data'

const initialState = data.columns

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    createColumn: (state, { payload }) => {
      state = {
        ...state,
        [payload.newColumn.id]: payload.newColumn,
      }
      return state
    },
    deleteColumn: (state, {payload}) => {
      // TODO Ajustar esse codigo para deletar a coluna e as tasks da coluna 
      const columnTasks = state.columns[payload.columnId].taskIds
      delete state.columns[payload.columnId]
      columnTasks.forEach((taskId) => {
        delete state.tasks[taskId]
      })
      const index = state.columnOrder.indexOf(payload.columnId)
      state.columnOrder.splice(index, 1)
      return state
    },
    editColumn: (state, {payload}) => {
      state.columns[payload.columnId] = payload.editedColumn
      return state
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

// Selectors
export const getColumns = state => state.columns

export const { updateData, createColumn, deleteColumn, editColumn } = columnSlice.actions

export default columnSlice.reducer