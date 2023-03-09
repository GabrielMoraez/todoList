import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import data from '../../dummyData/data'
import { deleteColumn } from '../column/columnSlice';
import { deleteTask } from '../task/taskSlice';

const initialState = {
  data: data.boards,
  activeBoardId: data.activeBoardId,
}

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setActiveBoard: (state, { payload }) => {
      state = {
      ...state,
        activeBoardId: payload.boardId,
      }
      return state
    },
    createBoard: (state, { payload }) => {
      state = {
        ...state,
        boards: {
          ...state.boards,
          [payload.newBoard.id]: payload.newBoard,
        }
      }
      return state
    },
    deleteBoard: (state, { payload }) => {
      delete state.data[payload.boardId]
      return state
    },
    editBoard: (state, { payload }) => {
      state.boards.data[payload.boardId] = {
        ...state.boards.data[payload.boardId],
        ...payload.editedBoard
      }
      // state.boards.data[payload.boardId] = payload.editedBoard
      return state
    },
    changeBoardColumns: (state, { payload }) => {
      const { operationType, targetBoardId, columnId } = payload
      const targetBoard = state.data[targetBoardId]
      const columnIndex = targetBoard.columns.indexOf(columnId)
    
      switch (operationType) {
        case 'delete':
          targetBoard.columns.splice(columnIndex, 1)
          break
        default:
          targetBoard.columns.push(columnId)
          break
      }
    
      return state;
    },
    changeBoardTasks: (state, { payload }) => {
      if (payload.operation == 'delete') {
        state.boards.data[payload.boardId].tasks = state.boards.data[payload.boardId].tasks.filter(task => task.id!= payload.taskId)
      } else {
        state.boards.data[payload.boardId].tasks.push(payload.task)
      }
    }
  },
});

// Selectors
export const getActiveBoard = state => state.boards.data[state.boards.activeBoardId]
export const getActiveBoardId = state => state.activeBoardId
export const getBoardsIds = state => Object.keys(state.boards.data)
export const getBoard = (state, boardId) => state.boards.data[boardId]

// Thunks

export const fullDeleteBoard = createAsyncThunk(
  'boardSlice/fullDeleteBoard',
  async ({ newActiveBoardId }, { dispatch, getState }) => {
    const state = getState()
    let boardId = state.boards.activeBoardId
    let columns = state.boards.data[boardId].columns
    let tasks = []

    dispatch(setActiveBoard({ boardId: newActiveBoardId }))
    dispatch(deleteBoard({ boardId }))
    columns.forEach(column => {
      dispatch(deleteColumn({ columnId: column}))
      tasks.push(...state.columns[column].taskIds)
    })
    tasks.forEach(task => {
      dispatch(deleteTask({ taskId: task }))
    })
  }
)

export const {
  setActiveBoard, createBoard, deleteBoard, editBoard, changeBoardColumns, changeBoardTasks
} = boardSlice.actions

export default boardSlice.reducer