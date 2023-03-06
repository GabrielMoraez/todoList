import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { updateData, createColumn, createBoard, setActiveBoard, deleteBoard } from './slices/dataSlice'
import Column from './components/Column'
import Header from './components/Header'
import BoardIcon from './components/boardIcon'

import './style.scss'

export default function App() {
  const [collapseBoardMenu, setCollapseBoardMenu] = useState(false)
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  
  const activeBoard = data.activeBoard

  console.log(data.boards, activeBoard)
  
  const columnIds = data.boards[activeBoard].columnOrder || []

  const boardsIds = Object.keys(data.boards)

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

  const handleCreateBoard = () => {
    const newBoard = {
      id: `board-${boardsIds.length + 1}`,
      title: 'New Board',
      tasks: [],
      columns: [],
      columnOrder: [],
    }
    dispatch(createBoard({newBoard}))
    dispatch(setActiveBoard({ boardId: newBoard.id }))
  }

  const handleDeleteBoard = () => {
    const index = boardsIds.indexOf(activeBoard)
    boardsIds.splice(index, 1)

    const newActiveBoard = boardsIds[0]
    console.log(newActiveBoard)
    dispatch(setActiveBoard({ boardId: newActiveBoard }))

    dispatch(deleteBoard({ boardId: activeBoard }))
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
      const column = data.boards[activeBoard].columns[source.droppableId]
      const tasks = Array.from(column.taskIds)
  
      tasks.splice(source.index, 1)
      tasks.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...column,
        taskIds: tasks
      }
    
      dispatch(updatedata.boards({newColumn}))

      return
    }

    const sourceColumn = data.boards[activeBoard].columns[source.droppableId]
    const sourceTasks = Array.from(sourceColumn.taskIds)

    const destinationColumn = data.boards[activeBoard].columns[destination.droppableId]
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
      ...data.boards,
      columns: {
        ...data.boards[activeBoard].columns,
        [newColumn.id]: newColumn,
        [oldColumn.id]: oldColumn,
      },
    }

    dispatch(updatedata.boards({newColumn, oldColumn}))
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
              {
                boardsIds.map((board) => (
                  <BoardIcon activeBoardId={activeBoard} key={board} boardId={board} board={data.boards[board]} />
                ))
              }
              <div className='add-project-icon' onClick={handleCreateBoard}>
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
                <span>Dashboard</span>/<span>Projects</span>/<span>{data.boards[activeBoard].title}</span>
              </div>
              <div className='board-menu-container'>
                <div className='board-icon board-info'>
                  <FontAwesomeIcon size='lg' icon='question-circle' />
                </div>
                <div className='board-icon board-like'>
                  <FontAwesomeIcon size='lg' icon='heart' />
                </div>
                <div className='board-icon board-menu-icon' onClick={() => setCollapseBoardMenu(!collapseBoardMenu)}>
                  <FontAwesomeIcon size='lg' icon='ellipsis' />
                </div>
                {collapseBoardMenu && (
                  <div className='column-menu'>
                    <ul>
                      <li onClick={handleDeleteBoard}>
                        <FontAwesomeIcon size='sm' icon="fa-solid fa-trash" />
                        {'Delete Board'}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className='board-header'>
              <div className='board-title'>
                <h1>{data.boards[activeBoard].title}</h1>
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
                data.boards[activeBoard].columnOrder.map((columnId, index) => {
                  let column = {}
                  let tasks = Array
                  column = data.boards[activeBoard].columns[columnId]
                  tasks = column.taskIds.map(taskId => data.boards[activeBoard].tasks[taskId])
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
