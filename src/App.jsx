import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Column from './components/Column'
import data from './data'

import './style.scss'

class App extends React.Component {
  state = data

  onDragEnd = result => {
    const { destination, source, draggableId } = result
    console.log(result)
    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    
    if (destination.droppableId === source.droppableId) {
      const column = this.state.columns[source.droppableId]
      const tasks = Array.from(column.taskIds)
  
      tasks.splice(source.index, 1)
      tasks.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...column,
        taskIds: tasks
      }
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      }
      
      this.setState(newState)
      
      return
    }


    const sourceColumn = this.state.columns[source.droppableId]
    const sourceTasks = Array.from(sourceColumn.taskIds)

    const destinationColumn = this.state.columns[destination.droppableId]
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
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
        [oldColumn.id]: oldColumn,
      },
    }

    this.setState(newState)

  }


  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className='container'>
          {
            this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId]
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
          
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
}

export default App
