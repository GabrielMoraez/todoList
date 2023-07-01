import * as React from "react"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import LoginScreen from "../components/Screens/LoginScreen"
import RegisterScreen from "../components/Screens/RegisterScreen"
import BoardScreen from "../components/Screens/BoardScreen"

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
    element: <BoardScreen />,
  },
]);

export default router
