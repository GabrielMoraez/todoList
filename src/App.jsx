import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'

import Column from './components/Column'
import { updateData, createColumn } from './slices/dataSlice'
import './style.scss'
import Header from './components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function App() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  
  const columnIds = data.columnOrder

  const handleCreateColumn = () => {
    const sortedIds = [...columnIds].sort()
    const lastColumnId = sortedIds[columnIds.length - 1]
    const newColumnId = `column-${Number((lastColumnId).split('-')[1]) + 1}`

    const newColumn = {
      id: newColumnId,
      title: 'New Column',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    }

    dispatch(createColumn({newColumn}))

  }
  
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
    <>
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='main-container'>
          <div className='board-side-menu-wrapper'>
            <div className='board-side-menu-hamburger'>
              <FontAwesomeIcon size='xl' icon='bars' />
            </div>
            <div className='projects-wrapper'>
              <div className='project-icon'>
                GM
              </div>
              <div className='project-icon'>
                GM
              </div>
              <div className='project-icon'>
                GM
              </div>
              <div className='add-project-icon'>
                <FontAwesomeIcon size='lg' icon='plus' />
              </div>
            </div>
            <div className='projects-config-wrapper'>
              <div className='projects-config'>
                <FontAwesomeIcon size='lg' icon='cog' />
              </div>
            </div>
          </div>
          <div className='project-board'>
            <div className='board-menu-wrapper'>
              <div className='breadcrumb'>
                <span>Dashboard</span>/<span>Projects</span>/<span>Blablablabla</span>
              </div>
              <div className='board-menu-container'>
                <div className='board-icon board-info'>
                  <FontAwesomeIcon size='lg' icon='question-circle' />
                </div>
                <div className='board-icon board-like'>
                  <FontAwesomeIcon size='lg' icon='heart' />
                </div>
                <div className='board-icon board-menu-icon'>
                  <FontAwesomeIcon size='lg' icon='ellipsis' />
                </div>
              </div>
            </div>
            <div className='board-header'>
              <div className='board-title'>
                <h1>Gabriel's To-Do List Project</h1>
              </div>
              <div className='board-view-wrapper'>
                <div className='active'>
                  Task Board
                </div>
                <div>
                  Tasks
                </div>
              </div>
              {/* <div className='board-filters'>
                <div className='contributors'> 
                  <div>
                    GM
                  </div>
                  <div>
                    GM
                  </div>
                  <div>
                    <FontAwesomeIcon size='lg' icon='plus' />
                  </div>
                </div>
                <div className='filters'>
                  <div>
                    <FontAwesomeIcon size='lg' icon='filter' />
                    Filter
                  </div>
                </div>
              </div> */}
            </div>
            <div className='board-content'>
              {
                data.columnOrder.map((columnId, index) => {
                  const column = data.columns[columnId]
                  const tasks = column.taskIds.map(taskId => data.tasks[taskId])
              
                  return <Column
                    key={index}
                    column={column}
                    title={column.title}
                    tasks={tasks}
                    />
                })
              }
              <div className='add-column' onClick={handleCreateColumn}>
                <FontAwesomeIcon icon='plus' />
                Add Column
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </>
  )
}
