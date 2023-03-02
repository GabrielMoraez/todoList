import { useState } from 'react'
import Column from './components/Column'
import './style.scss'

function App() {

  return (
    <div className='container'>
      <Column title={'To-do'} />
      <Column title={'Doing'}/>
      <Column title={'Done'}/>
    </div>
  )
}

export default App
