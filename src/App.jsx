import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Router'

import './style.scss'

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
