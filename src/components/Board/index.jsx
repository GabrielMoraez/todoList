import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeBoardColumns, editBoard, fullDeleteBoard, getBoardsIds } from '../../slices/board/boardSlice'
import { createColumn, getColumns } from '../../slices/column/columnSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Column from '../Column'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './style.scss'

export default function Board({ board }) {
  const dispatch = useDispatch()

  const [collapseBoardMenu, setCollapseBoardMenu] = useState(false)
  const [showBoardEdit, setShowBoardEdit]         = useState(false)

  const columns     = useSelector(state => getColumns(state))
  const boardsIds   = useSelector(state => getBoardsIds(state))

  const handleDeleteBoard = () => {
    boardsIds.splice(boardsIds.indexOf(board.id), 1)
    const newActiveBoardId = boardsIds[0]
    
    dispatch(fullDeleteBoard({ newActiveBoardId }))
    setCollapseBoardMenu(false)
  }

  const handleOpenBoardEdit = () => {
    setShowBoardEdit(true)
    setCollapseBoardMenu(false)
  }

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


    dispatch(createColumn({newColumn, boardId: board.id}))
    dispatch(changeBoardColumns({
      operationType: 'create',
      targetBoardId: board.id,
      columnId: newColumnId
    }))

  }

  const EditBoardModal = (props) => {
    const [boardTitle, setBoardTitle] = useState(props.title)

    const handleEditBoard = () => {
      const editedBoard = {
        ...board,
        title: boardTitle,
      }
  
      dispatch(editBoard({boardId: board.id, editedBoard}))
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
      <div className='project-board'>
        <div className='board-menu-wrapper'>
          <div className='breadcrumb'>
            <span>Dashboard</span>/<span>Projects</span>/<span>{board.title}</span>
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
            <h1>{board.title}</h1>
          </div>
          <div className='board-view-wrapper'>
            <div className='active'>
              Task Board
            </div>
            <div>
              Tasks
            </div>
          </div>
        </div>
        <div className='board-content'>
          {
            board.columns.length > 0 ?
            board.columns.map(columnId => (
              <Column
                key={columnId}
                column={columns[columnId]}
                boardId={board.id}
              />
            )) : <div>aaa</div>
          }
          <div className='add-column' onClick={handleCreateColumn}>
            <FontAwesomeIcon icon='plus' />
            Add Column
          </div>
        </div>
      </div>
      <EditBoardModal
          show={showBoardEdit}
          onHide={() => setShowBoardEdit(false)}
          title={board.title}
        />
    </>
  )
}
