import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getColumns, createColumn, updateData  } from './slices/column/columnSlice';
import { getActiveBoard, createBoard, setActiveBoard, deleteBoard, editBoard, getBoardsIds, changeBoardColumns, fullDeleteBoard, createBoardThunk } from './slices/board/boardSlice';
import Column from './components/Column'
import Header from './components/Header'
import BoardIcon from './components/boardIcon'

import './style.scss'


export default function App() {
  const [collapseBoardMenu, setCollapseBoardMenu] = useState(false)
  const [showBoardEdit, setShowBoardEdit]         = useState(false)

  const dispatch = useDispatch()
  
  const activeBoard = useSelector(state => getActiveBoard(state))
  const columns     = useSelector(state => getColumns(state))
  const boardsIds   = useSelector(state => getBoardsIds(state))

  const handleCreateColumn = () => {
    const sortedIds = Object.keys(columns).sort((a, b) => {
      const aNum = parseInt(a.replace('column-', ''));
      const bNum = parseInt(b.replace('column-', ''));

      return aNum !== bNum 
      ? aNum - bNum 
      : a < b ? -1 : a > b ? 1 : 0;
    })

    const lastColumnId = sortedIds[sortedIds.length - 1]
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


    dispatch(createColumn({newColumn, boardId: activeBoard.id}))
    dispatch(changeBoardColumns({
      operationType: 'create',
      targetBoardId: activeBoard.id,
      columnId: newColumnId
    }))

  }

  const handleCreateBoard = () => {
    dispatch(createBoardThunk())
  }

  const handleDeleteBoard = () => {
    boardsIds.splice(boardsIds.indexOf(activeBoard.id), 1)
    const newActiveBoardId = boardsIds[0]
    
    dispatch(fullDeleteBoard({ newActiveBoardId }))
    setCollapseBoardMenu(false)

  }

  const handleOpenBoardEdit = () => {
    setShowBoardEdit(true)
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

  const EditBoardModal = (props) => {
    const [boardTitle, setBoardTitle] = useState(props.title)

    const handleEditBoard = () => {
      const editedBoard = {
        ...activeBoard,
        title: boardTitle,
      }
  
      dispatch(editBoard({boardId: activeBoard.id, editedBoard}))
      setShowBoardEdit(false)
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <input
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={handleEditBoard}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
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
                boardsIds.map((boardId) => (
                  <BoardIcon activeBoardId={activeBoard.id} key={boardId} boardId={boardId} />
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
                <span>Dashboard</span>/<span>Projects</span>/<span>{activeBoard.title}</span>
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
                    <ul>
                      <li onClick={handleOpenBoardEdit}>
                        <FontAwesomeIcon size='sm' icon="fa-solid fa-pencil" />
                        {'Edit Board'}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className='board-header'>
              <div className='board-title'>
                <h1>{activeBoard.title}</h1>
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
                activeBoard.columns.map(columnId => (
                  <Column
                    key={columnId}
                    column={columns[columnId]}
                    boardId={activeBoard.id}
                  />
                )
              )}
              <div className='add-column' onClick={handleCreateColumn}>
                <FontAwesomeIcon icon='plus' />
                Add Column
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
      <EditBoardModal
        show={showBoardEdit}
        onHide={() => setShowBoardEdit(false)}
        title={activeBoard.title}
      />
    </>
  )
}
