import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient('https://feybmhywbhyguwchszdl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleWJtaHl3Ymh5Z3V3Y2hzemRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyMzc2MzgsImV4cCI6MjAwMzgxMzYzOH0.xsOek1h2THKuKAYgIlYYBigiBMUjwl5VCpg-Nd3XPH4')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    session: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      const { user } = payload
      state.user = user
    },
    setSession: (state, { payload }) => {
      const { session } = payload
      state.session = session
    }
  }
})

export const { setUser, setSession } = authSlice.actions

export const getSession = (state) => state?.auth?.session

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    dispatch(setUser(data))
    dispatch(setSession(data))
  } catch (error) {
    console.error(error)
  }
}

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name
        }
      }
    })
    dispatch(setUser(data))
    dispatch(setSession(data))
  } catch (error) {
    console.error(error)
  }
}

export const signOut = () => async (dispatch) => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    dispatch(setUser({user: null}))
    dispatch(setSession({session: null}))
  }
}

export const fetchSession = createAsyncThunk(
  'auth/fetchSession',
  async (_, { getState, dispatch }) => {
    try {
      const { data } = await supabase.auth.getSession();
      dispatch(setUser({user: data.session.user}))
      dispatch(setSession({session: data.session}))
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const authReducer = authSlice.reducer