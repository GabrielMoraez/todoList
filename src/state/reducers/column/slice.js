import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteTask } from '../task/slice'
import { changeBoardColumns } from '../board/slice'
import { createClient } from '@supabase/supabase-js'

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
})

export const {
  updateData, createColumn, deleteColumn,
  editColumn, changeColumnTasks, setColumns
} = columnSlice.actions

// Selectors
export const getColumns = state => state.columns.list
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

export const columnReducer = columnSlice.reducer