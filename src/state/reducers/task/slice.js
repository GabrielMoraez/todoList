import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { changeColumnTasks } from '../column/slice';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://feybmhywbhyguwchszdl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleWJtaHl3Ymh5Z3V3Y2hzemRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyMzc2MzgsImV4cCI6MjAwMzgxMzYzOH0.xsOek1h2THKuKAYgIlYYBigiBMUjwl5VCpg-Nd3XPH4')

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    list: []
  },
  reducers: {
    setTasks: (state, { payload }) => {
      const tasks = payload
      state.list = tasks
    },
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

export const { createTask, deleteTask, editTask, setTasks} = taskSlice.actions

// Selectors 
export const getTasks = state => state?.tasks ? state.tasks.list : []

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

export const fetchTasks = createAsyncThunk(
  'taskSlice/fetchTasks',
  async (_, { getState, dispatch }) => {
    let userId = getState().auth.user.id
    try {
      const { data, error } = await supabase
        .from('userTasks')
        .select(`
          id,
          tasks (*)
        `)
        .eq('user_id', `${userId}`)

        let tasks = []
        data.forEach(task => tasks.push(task.tasks))
        dispatch(setTasks(tasks))
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const taskReducer = taskSlice.reducer