import { createSlice, current } from '@reduxjs/toolkit';
import data from '../dummyData/data'

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
    deleteColumn: (state, {payload}) => {
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
    setActiveBoard: (state, { payload }) => {
      state = {
      ...state,
        activeBoard: payload.boardId,
      }
      console.log(state.activeBoard)
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
      state.boards[payload.boardId] = payload.editedBoard
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


export const {
  createNewTask, deleteTask, editTask, updateData, createColumn,
  deleteColumn, editColumn, setActiveBoard, createBoard, deleteBoard, editBoard
} = dataSlice.actions

export default dataSlice.reducer