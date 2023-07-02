import React from 'react'
import './style.scss'
import { RouterProvider } from 'react-router-dom'
import router from './Router'

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
