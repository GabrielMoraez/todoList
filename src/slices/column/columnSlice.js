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
    deleteColumn: (state, { payload }) => {
      delete state[payload.columnId]
      return state
    },
    editColumn: (state, { payload} ) => {
      state.columns[payload.columnId] = payload.editedColumn
      return state
    },
    changeColumnTasks: (state, { payload }) => {
      switch (payload.operationType) {
        case 'delete':
          let taskIndex = state[payload.columnId].taskIds.indexOf(payload.taskId)
          state[payload.columnId].taskIds.splice(taskIndex, 1)
          break;
        default:
          state[payload.columnId].taskIds.push(payload.taskId)
          break;
      }
      return state
    },
    updateData: (state, { payload }) => {
      state = {
        ...state,
        [payload.newColumn.id]: payload.newColumn,
      }

      if (payload.oldColumn) {
        state = {
          ...state,
          [payload.oldColumn.id]: payload.oldColumn,
        }
      }
      
      return state
    },
  },
});

// Selectors
export const getColumns = state => state.columns
export const getColumn = (state, columnId) => state.columns[columnId]


// Thunks
export const createColumnThunk = createAsyncThunk(
  'columnSlice/createColumnTunk',
  async ({ boardId }, { dispatch, getState }) => {
    const state = getState()
    const columnIds = Object.keys(state.columns)

    const sortedIds = columnIds.sort((a, b) => {
      const aNum = parseInt(a.replace('column-', ''));
      const bNum = parseInt(b.replace('column-', ''));

      return aNum !== bNum 
      ? aNum - bNum 
      : a < b ? -1 : a > b ? 1 : 0;
    })

    const lastColumnId = sortedIds[sortedIds.length - 1]
    const newColumnId = `column-${Number((lastColumnId).split('-')[1]) + 1}`

    const newColumn = {
      id: newColumnId,
      title: 'New Column',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    }

    dispatch(createColumn({newColumn, boardId}))
    dispatch(changeBoardColumns({
      operationType: 'create',
      targetBoardId: boardId,
      columnId: newColumnId
    }))
  }
)

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
)

export const {
  updateData, createColumn, deleteColumn,
  editColumn, changeColumnTasks
} = columnSlice.actions

export default columnSlice.reducer