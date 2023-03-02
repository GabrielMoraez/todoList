import { useState } from 'react'
import Task from '../Task'

export default function Column({title}) {
  return (
    <div className='column'>
      <h1>{title}</h1>
      <div className='task-wrapper'>
        <Task
          taskTitle={'This is a task'}
        />
      </div>
    </div>
  )
}
