import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeBoardColumns, editBoard, getBoardsIds, deleteBoardThunk } from '../../state/reducers/board/slice'
import { createColumn, createColumnThunk, getColumns, fetchColumns } from '../../state/reducers/column/slice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Column from '../Column'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './style.scss'
import { signOut } from '../../state/reducers/auth/slice'

export default function Board({ board }) {
  const dispatch = useDispatch()

  const [collapseBoardMenu, setCollapseBoardMenu] = useState(false)
  const [showBoardEdit, setShowBoardEdit]         = useState(false)

  const columns     = useSelector(state => getColumns(state))
  const boardsIds   = useSelector(state => getBoardsIds(state))

  useEffect(() => {
    dispatch(fetchColumns())
  }, [])

  const handleDeleteBoard = () => {
    dispatch(deleteBoardThunk(board.id))
    setCollapseBoardMenu(false)
  }

  const handleOpenBoardEdit = () => {
    setShowBoardEdit(true)
    setCollapseBoardMenu(false)
  }

  const handleCreateColumn = () => {
    dispatch(createColumnThunk({ boardId: board.id }))
  }

  const handleSignOut = () => {
    dispatch(signOut())
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
            <div onClick={handleSignOut} className='board-icon board-like'>
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
            columns.length > 0 ?
            columns.map(column => (
              <Column
                key={column.id}
                column={column}
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
