import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import data from '../../../dummyData/data'
import { deleteColumn } from '../column/slice'
import { deleteTask } from '../task/slice'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://feybmhywbhyguwchszdl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleWJtaHl3Ymh5Z3V3Y2hzemRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyMzc2MzgsImV4cCI6MjAwMzgxMzYzOH0.xsOek1h2THKuKAYgIlYYBigiBMUjwl5VCpg-Nd3XPH4')

const initialState = {
  data: data.boards,
  activeBoardId: data.activeBoardId,
}

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state, { payload }) => {
      const boards = payload
      state.data = boards
    },
    setActiveBoard: (state, { payload }) => {
      const activeBoardId = payload
      state.activeBoardId = activeBoardId
    },
    createBoard: (state, { payload }) => {
      state = {
        ...state,
        data: {
          ...state.data,
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
      state.data[payload.boardId] = {
        ...state.data[payload.boardId],
        ...payload.editedBoard
      }
      return state
    },
    changeBoardColumns: (state, { payload }) => {
      const { operationType, targetBoardId, columnId } = payload
      const targetBoard = state.data[targetBoardId]
    
      switch (operationType) {
        case 'delete':
          const columnIndex = targetBoard.columns.indexOf(columnId)
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
})

export const {
  setActiveBoard, createBoard, deleteBoard, editBoard, changeBoardColumns, changeBoardTasks, setBoards
} = boardSlice.actions

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

export const createBoardThunk = createAsyncThunk(
  'boardSlice/createBoardThunk',
   async (_, { dispatch, getState }) => {
    const state = getState()

    const boardsIds = Object.keys(state.boards.data)

    const sortedBoardIds = boardsIds.sort((a, b) => {
      console.log(a, b)
      const aNum = parseInt(a.replace('board-', ''));
      const bNum = parseInt(b.replace('board-', ''));

      return aNum !== bNum 
      ? aNum - bNum 
      : a < b ? -1 : a > b ? 1 : 0;
    })

    const lastBoardId = sortedBoardIds[sortedBoardIds.length - 1]
    const newBoardId  = `board-${Number((lastBoardId).split('-')[1]) + 1}`

    const newBoard    = {
      id: newBoardId,
      title: 'New Board',
      columns: [],
    }

    dispatch(createBoard({newBoard}))
    dispatch(setActiveBoard({ boardId: newBoard.id }))
  }
)

export const fetchBoards = createAsyncThunk(
  'boardSlice/fetchBoards',
  async (_, { getState, dispatch }) => {
    let userId = getState().auth.user.id
    console.log(userId)
    try {
      const { data, error } = await supabase
        .from('userBoards')
        .select(`
          id,
          boards (id, title)
        `)
        .eq('user_id', `${userId}`)
      let boards = []
      data.forEach(board => boards.push(board.boards))
      console.log(boards)
      dispatch(setBoards(boards))
      dispatch(setActiveBoard(boards[0].id))
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const boardReducer = boardSlice.reducer