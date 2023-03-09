import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import data from '../../dummyData/data'
import { deleteTask } from '../task/taskSlice';
import { changeBoardColumns } from '../board/boardSlice';

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
      delete state[payload.columnId]
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


// Thunks
export const fullDeleteColumn = createAsyncThunk(
  'columnSlice/fullDeleteColumn',
  async ({ boardId, column }, { dispatch }) => {
    const tasksToDelete = column.taskIds || []
    
    dispatch(changeBoardColumns({
      operationType: 'delete',
      targetBoardId: boardId,
      columnId: column.id
    }))
    dispatch(deleteColumn({ columnId: column.id }))
    await Promise.all(tasksToDelete.map(taskId => dispatch(deleteTask({ taskId }))))
  }
);

export const { updateData, createColumn, deleteColumn, editColumn } = columnSlice.actions

export default columnSlice.reducer