import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteTask } from '../task/slice'
import { createClient } from '@supabase/supabase-js'
import { updateBoardThunk } from '../board/slice'

const supabase = createClient('https://feybmhywbhyguwchszdl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleWJtaHl3Ymh5Z3V3Y2hzemRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyMzc2MzgsImV4cCI6MjAwMzgxMzYzOH0.xsOek1h2THKuKAYgIlYYBigiBMUjwl5VCpg-Nd3XPH4')

const columnSlice = createSlice({
  name: 'column',
  initialState: {
    list: []
  },
  reducers: {
    setColumns: (state, { payload }) => {
      const columns = payload
      state.list = columns
    },
    createColumn: (state, { payload }) => {
      const newColumn = payload
      state.list.push(newColumn)
    },
    deleteColumn: (state, { payload} ) => {
      const columnId = payload
      state.list = state.list.filter(column => column.id !== columnId)
    },
    editColumn: (state, { payload} ) => {
      state.columns[payload.columnId] = payload.editedColumn
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
})

export const {
  updateData, createColumn, editColumn, changeColumnTasks, setColumns, deleteColumn
} = columnSlice.actions

// Selectors
export const getColumns = state => state.columns.list
export const getColumn = (state, columnId) => state.columns[columnId]


// Thunks
export const fetchColumns = createAsyncThunk(
  'columnSlice/fetchColumns',
  async (_, { getState, dispatch }) => {
    let activeBoardId = getState().boards.activeBoardId
    try {
      const { data, error } = await supabase
        .from('boardColumns')
        .select(`
          id,
          columns (*)
        `)
        .eq('board_id', `${activeBoardId}`)
        
      const columns = []
      data.forEach((column) => columns.push(column.columns))
      dispatch(setColumns(columns))
    } catch (error) {
      console.error(error)
    }
  }
)

export const createColumnThunk = createAsyncThunk(
  'columnSlice/createColumnTunk',
  async (boardId, { dispatch, getState }) => {
    const board = getState().boards.data.find(board => board.id === boardId)

    try {
      const { data: columnData, error: columnError } = await supabase
        .from('columns')
        .insert([
          {
            title: 'New Column',
            taskIds: [],
            config: {
              "textColor": "#FFF",
              "backgroundColor": "#8e7d72"
            }
          },
        ])
        .select()
      
      const { data, error } = await supabase
        .from('boardColumns')
        .insert([
          { board_id: boardId, column_id: columnData[0].id },
        ])
        .select()

      dispatch(createColumn(columnData[0]))

      dispatch(updateBoardThunk({
        body: {
          title: board.title,
          columns: [...board.columns, columnData[0].id],
        },
        boardId: boardId,
      }))

    } catch (error) {
      console.error(error)
    }
  }
)

export const deleteColumnThunk = createAsyncThunk(
  'columnSlice/deleteColumnThunk',
  async ({columnId, boardId}, { dispatch, getState }) => {
    const board = getState().boards.data.find(board => board.id === boardId)
    
    try {
      const { error } = await supabase
        .from('columns')
        .delete()
        .eq('id', columnId)

      dispatch(deleteColumn(columnId))

      dispatch(updateBoardThunk({
        body: {
          title: board.title,
          columns: board.columns.filter((column) => column !== columnId),
        },
        boardId: board.id,
      }))

    } catch (error) {
      console.error(error)
    }
  }
)

export const columnReducer = columnSlice.reducer