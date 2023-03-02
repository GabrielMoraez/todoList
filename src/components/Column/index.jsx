import { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Task from '../Task'

export default function Column({title, columnId, tasks}) {
  return (
    <div className='column'>
      <h1>{title}</h1>
      <Droppable droppableId={columnId}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='task-wrapper'
          >
            {
              tasks.map((task, index) => 
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                />
              )
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
