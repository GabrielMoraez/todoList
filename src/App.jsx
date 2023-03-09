import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { getColumns, updateData  } from './slices/column/columnSlice'
import { getActiveBoard, getBoardsIds, createBoardThunk } from './slices/board/boardSlice'
import Board from './components/Board'
import Header from './components/Header'
import BoardIcon from './components/boardIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './style.scss'

export default function App() {
  const dispatch = useDispatch()
  
  const activeBoard = useSelector(state => getActiveBoard(state))
  const boardsIds   = useSelector(state => getBoardsIds(state))

  const handleCreateBoard = () => {
    dispatch(createBoardThunk())
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
      const column = activeBoard.columns[source.droppableId]
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

    const sourceColumn = activeBoard.columns[source.droppableId]
    const sourceTasks = Array.from(sourceColumn.taskIds)

    const destinationColumn = activeBoard.columns[destination.droppableId]
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
              { boardsIds.length ? 
                boardsIds.map((boardId) => (
                  <BoardIcon activeBoardId={activeBoard.id} key={boardId} boardId={boardId} />
                )) : null
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
          { activeBoard?.id ?
            <Board board={activeBoard} /> :
            <div>criar board</div>
          }
        </div>
      </DragDropContext>
    </>
  )
}
