import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { deleteColumn, fetchColumns } from '../column/slice'
import { deleteTask } from '../task/slice'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://feybmhywbhyguwchszdl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleWJtaHl3Ymh5Z3V3Y2hzemRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyMzc2MzgsImV4cCI6MjAwMzgxMzYzOH0.xsOek1h2THKuKAYgIlYYBigiBMUjwl5VCpg-Nd3XPH4')

const initialState = {
  data: null,
  activeBoardId: null,
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
      const board = payload
      state.data.push(board)
    },
    updateBoard: (state, { payload }) => {
      const updatedBoard = payload
      state.data.forEach((board, i) => {
        if (board.id === updatedBoard.id) {
          state.data[i] = updatedBoard
        }
      })
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
  setBoards, setActiveBoard, createBoard, updateBoard, changeBoardTasks
} = boardSlice.actions

// Selectors
export const getActiveBoard = state => {
  return state.boards.data ?
    state.boards.data.find(board => board.id === state.boards.activeBoardId) :
    null
}

export const getActiveBoardId = state => state.boards.activeBoardId

export const getBoardsIds = state => state.boards.data ? state.boards.data.map((board) => board.id) : []

export const getBoard = (state, boardId) => state.boards.data.find((board) => board.id === boardId)

// Thunks

// Get's the boards lists from the database, based on the user's id
export const fetchBoards = createAsyncThunk(
  'boardSlice/fetchBoards',
  async (_, { getState, dispatch }) => {
    let userId = getState().auth.user.id
    try {
      const { data, error } = await supabase
        .from('userBoards')
        .select(`
          id,
          boards (*)
        `)
        .eq('user_id', `${userId}`)
      let boards = []
      data.forEach(board => boards.push(board.boards))
      dispatch(setBoards(boards))
      dispatch(setActiveBoard(boards[0].id))
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
)

// Deletes a specific board based on its id, then updates the boards list state and the activeBoard
export const deleteBoardThunk = createAsyncThunk(
  'boardSlice/deleteBoardThunk',
  async (boardId, { dispatch, getState }) => {
    let boardList = getState().boards.data
    try {
      console.log(boardId)

      const { error } = await supabase
        .from('boards')
        .delete()
        .eq('id', boardId)

      boardList = boardList.filter(board => board.id !== boardId)
      dispatch(setBoards(boardList))
      dispatch(setActiveBoard(boardList[0].id))
      dispatch(fetchColumns())

    } catch (error) {
      console.error(error)
    }
  }
)

//  Creates a new board at database, after creating calls the setBoard to update the state and changes the activeBoard to the new board ID
export const createBoardThunk = createAsyncThunk(
  'boardSlice/createBoardThunk',
   async (_, { dispatch, getState }) => {
    let userId = getState().auth.user.id

    try {
          
      const { data: boardData, error: boardError } = await supabase
        .from('boards')
        .insert([
          { title: 'New Board', columns: [] },
        ])
        .select()

        
      const { data: relData, error: relError } = await supabase
        .from('userBoards')
        .insert([
          { user_id: userId, board_id: boardData[0].id },
        ])
        .select()


      dispatch(createBoard(boardData[0]))
      dispatch(setActiveBoard(boardData[0].id))
      dispatch(fetchColumns())

    } catch (error) {
      console.error(error)
    }
  }
)

// Get's the boards lists from the database, based on the user's id
export const updateBoardThunk = createAsyncThunk(
  'boardSlice/updateBoardThunk',
  async ({body, boardId}, { getState, dispatch }) => {
    try {
      const { data, error } = await supabase
        .from('boards')
        .update({
          title: body.title,
          columns: body.columns
        })
        .eq('id', boardId)
        .select()
    
      dispatch(updateBoard(data[0]))
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
)

export const boardReducer = boardSlice.reducer