import * as React from "react"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import LoginScreen from "../components/Screens/LoginScreen"
import RegisterScreen from "../components/Screens/RegisterScreen"
import BoardScreen from "../components/Screens/BoardScreen"
import { PrivateRoute } from "./PrivateRoute"
import { useSelector } from "react-redux"
import { getSession } from "../state/reducers/auth/slice"
import { useDispatch } from "react-redux"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/signup",
    element: <RegisterScreen />,
  },
  {
    path: "/boards",
    element: (
      <PrivateRoute>
        <BoardScreen />
      </PrivateRoute>
    ),
  },
]);

export default router
