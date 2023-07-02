import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import data from '../../../dummyData/data'
import { changeColumnTasks } from '../column/slice';

const initialState = data.tasks

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, { payload }) => {
      state = {
        ...state,
        [payload.newTask.id]: payload.newTask
      }
      return state
		},
    deleteTask: (state, { payload }) => {
      delete state[payload.taskId]
      return state
    },
    editTask: (state, {payload}) => {
      state.tasks[payload.taskId] = payload.editedTask
      return state
    },
  }
})

export const { createTask, deleteTask, editTask, } = taskSlice.actions

// Selectors 
export const getTasks = state => state.tasks

// Thunks

export const createTaskThunk = createAsyncThunk(
  'taskSlice/createTaskThunk',
  async ( { columnId }, {dispatch, getState}) => {
    const state = getState()
    const tasksIds = Object.keys(state.tasks)
    const newTaskId = `task-${Number((tasksIds[tasksIds.length-1]).split('-')[1]) + 1}`

    const newTask = {
      id: newTaskId,
      title: 'Testing creation'
    }

    dispatch(createTask({ newTask }))
    dispatch(changeColumnTasks({
      operationType: 'create',
      taskId: newTask.id,
      columnId: columnId
    }))
  }
)

export const fullDeleteTask = createAsyncThunk(
  'taskSlice/fullDeleteTask',
  async ( { taskId, columnId }, { dispatch }) => {
    dispatch(deleteTask({ taskId }))
    dispatch(changeColumnTasks({
      operationType: 'delete',
      taskId: taskId,
      columnId: columnId
    }))
  }
)

export const taskReducer = taskSlice.reducer