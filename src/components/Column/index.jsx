import { useEffect, useRef, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { deleteColumn, editColumn, fullDeleteColumn} from '../../state/reducers/column/slice'
import { getTasks, createTask, deleteTask, createTaskThunk, fetchTasks } from '../../state/reducers/task/slice'
import { changeBoardColumns } from '../../state/reducers/board/slice'

import Task from '../Task'

import './style.scss'
import config from '../../dummyData/config'

export default function Column({column, boardId}) {
  const [menuCollapse, setMenuCollapse]             = useState(false)
  const [showTaskCounter, setShowTaskCounter]       = useState(true)
  const [taskCounter, setTaskCounter]               = useState(0)
  const [columnEditCollapse, setColumnEditCollapse] = useState(false)

  const dispatch = useDispatch()

  const tasks = useSelector(state => getTasks(state))

  useEffect(() => {
    dispatch(fetchTasks())
    // setTaskCounter(column.taskIds.length)
  }, [])

  const handleToggleMenu = () => {
    setMenuCollapse(!menuCollapse)
  }

  const handleCreateTask = () => {
    dispatch(createTaskThunk({ columnId: column.id }))
    setMenuCollapse(false)
  }

  const handleShowHideTaskCounter = () => {
    setShowTaskCounter(!showTaskCounter)
  }

  const handleDeleteColumn = () => {
    dispatch(fullDeleteColumn({boardId, column}))    
  }

  const handleCollapseEditColumn = () => {
    setColumnEditCollapse(true)
  }

  function EditColumnModal() {
    const [columnTitle, setColumnTitle]         = useState(column.title)
    const [backgroundColor, setBackgroundColor] = useState(column.config.backgroundColor)
    const [textColor, setTextColor]             = useState(column.config.textColor)

    const handleEditTask = () => {
      const editedColumn = {
        ...column,
        title: columnTitle,
        config: {
          backgroundColor: backgroundColor,
          textColor: textColor
        }
      }
  
      dispatch(editColumn({columnId: column.id, editedColumn}))
      setColumnEditCollapse(false)
    }

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <input
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='backgroundColorWrapper'>
            <h6>Column Header Color</h6>
            <div className='colorsContainer'>
              {
                config.backgroundColors.map((color, index) => {
                  return (
                    <Button key={index} className={`colorButton ${color === backgroundColor ? 'selected' : ''}`} style={{backgroundColor: color, border: 'none'}}
                      onClick={() => setBackgroundColor(color)}
                    />
                  )
                })
              }
            </div>
          </div>
          <div className='textColorWrapper'>
            <h6>Column Text Color</h6>
            <div className='colorsContainer'>
              {
                config.textColors.map((color, index) => {
                  return (
                    <Button key={index} className={`colorButton textColorButton ${color === textColor ? 'selected' : ''}`} style={{backgroundColor: color, border: 'none'}}
                      onClick={() => setTextColor(color)}
                    />
                  )
                })
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditTask}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  return (
    <>
      <div className='column-container'>
        <div className='column-header' style={{backgroundColor: column.config.backgroundColor, color: column.config.textColor}}>
          <h1>{showTaskCounter ? `${column.title} / ${taskCounter}` : column.title}</h1>
          <div className='column-menu-container'>
            <div className={`column-menu-icon-wrapper ${menuCollapse && 'active'}`}  onClick={handleToggleMenu}>
              <FontAwesomeIcon size='lg' icon="fa-solid fa-ellipsis" />
            </div>
            {menuCollapse && (
              <div className='column-menu'>
                <ul>
                  <li onClick={handleCreateTask}>
                    <FontAwesomeIcon size='sm' icon="fa-solid fa-plus" />
                    Create new Task
                  </li>
                  <li onClick={handleShowHideTaskCounter}>
                    {showTaskCounter ? 'Disable Task Counter' : 'Enable Task Counter'}
                  </li>
                  <li onClick={handleDeleteColumn}>
                    <FontAwesomeIcon size='sm' icon="fa-solid fa-trash" />
                    {'Delete column'}
                  </li>
                  <li onClick={handleCollapseEditColumn}>
                    <FontAwesomeIcon size='sm' icon="fa-solid fa-pencil" />
                    {'Edit column'}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <Droppable droppableId={column.id.toString()}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='task-wrapper'
            >
              {
                column.taskIds.map((taskId, index) => 
                  <Task
                    key={taskId}
                    taskId={taskId}
                    index={index}
                    columnId={column.id}
                  />
                )
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <EditColumnModal
        show={columnEditCollapse}
        onHide={() => setColumnEditCollapse(false)}
      />
    </>
  )
}
