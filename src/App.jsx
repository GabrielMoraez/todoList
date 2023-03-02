import { useState } from 'react'
import Column from './components/Column'
import './style.scss'

function App() {

  return (
    <div className='container'>
      <Column></Column>
      <Column></Column>
      <Column></Column>
    </div>
  )
}

export default App
