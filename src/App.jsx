import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'

import Column from './components/Column'
import { updateData } from './slices/dataSlice'
import './style.scss'

export default function App() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  
  const onDragEnd = result => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    
    if (destination.droppableId === source.droppableId) {
      const column = data.columns[source.droppableId]
      const tasks = Array.from(column.taskIds)
  
      tasks.splice(source.index, 1)
      tasks.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...column,
        taskIds: tasks
      }
    
      dispatch(updateData({newColumn}))

      return
    }

    const sourceColumn = data.columns[source.droppableId]
    const sourceTasks = Array.from(sourceColumn.taskIds)

    const destinationColumn = data.columns[destination.droppableId]
    const destinationTasks = Array.from(destinationColumn.taskIds)

    sourceTasks.splice(source.index, 1)
    destinationTasks.splice(destination.index, 0, draggableId)

    const oldColumn ={
      ...sourceColumn,
      taskIds: sourceTasks
    }
    const newColumn = {
      ...destinationColumn,
      taskIds: destinationTasks
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
        [oldColumn.id]: oldColumn,
      },
    }

    dispatch(updateData({newColumn, oldColumn}))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='container'>
        {
          data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId]
            const tasks = column.taskIds.map(taskId => data.tasks[taskId])
        
            return <Column
              key={index}
              columnId={column.id}
              title={column.title}
              tasks={tasks}
              />
          })
        }
      </div>
    </DragDropContext>
  )
}
