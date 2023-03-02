import { useState } from 'react'
import Task from '../Task'

export default function Column() {
  return (
    <div className='column'>
      <h1>To-do</h1>
      <Task />
    </div>
  )
}
