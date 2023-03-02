import { useState } from 'react'

export default function Task({taskTitle}) {
  return (
    <div className='task'>
      {taskTitle}
    </div>
  )
}
