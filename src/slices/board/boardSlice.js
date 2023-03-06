import { createSlice, current } from '@reduxjs/toolkit';
import data from '../../dummyData/data'

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
      delete state.boards[payload.boardId]
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
      if (payload.operation == 'delete') {
        state.data[payload.boardId].columns = state.data[payload.boardId].columns.filter(column => column.id!= payload.columnId)
      } else {
        state.data[payload.boardId].columns.push(payload.columnId)
      }
      return state
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

export const {
  setActiveBoard, createBoard, deleteBoard, editBoard, changeBoardColumns, changeBoardTasks
} = boardSlice.actions

export default boardSlice.reducer