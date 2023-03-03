import { useEffect, useRef, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { createNewTask, deleteColumn, editColumn} from '../../slices/dataSlice'
import Task from '../Task'

import './style.scss'

export default function Column({title, columnId, tasks}) {
  const [menuCollapse, setMenuCollapse] = useState(false)
  const [showTaskCounter, setShowTaskCounter] = useState(true)
  const [taskCounter, setTaskCounter] = useState(0)
  const [columnEditCollapse, setColumnEditCollapse] = useState(false)

  const data = useSelector((state) => state.data)
  const dispatch = useDispatch()

  useEffect(() => {
    setTaskCounter(tasks.length)
  }, [tasks])

  const handleToggleMenu = () => {
    setMenuCollapse(!menuCollapse)
  }

  const handleCreateTask = () => {
    const tasksIds = Object.keys(data.tasks)
    const newTaskId = `task-${Number((tasksIds[tasksIds.length-1]).split('-')[1]) + 1}`

    const newTask = {
      id: newTaskId,
      title: 'Testing creation'
    }

    dispatch(createNewTask({columnId, newTask, newTaskId}))
    handleToggleMenu()
  }

  const handleShowHideTaskCounter = () => {
    setShowTaskCounter(!showTaskCounter)
  }

  const handleDeleteColumn = () => {
    dispatch(deleteColumn({columnId}))
  }

  const handleCollapseEditColumn = () => {
    setColumnEditCollapse(true)
  }

  function EditColumnModal(props) {
    const [columnTitle, setColumnTitle] = useState(props.title)

    const handleEditTask = () => {
      const editedColumn = {
        id: props.columnid,
        title: columnTitle,
        taskIds: data.columns[props.columnid].taskIds
      }

      console.log(editedColumn)
  
      dispatch(editColumn({columnId: props.columnid, editedColumn}))
      setColumnEditCollapse(false)
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
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={handleEditTask}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  return (
    <>
      <div className='column'>
        <div className='column-header'>
          <h1>{showTaskCounter ? `${title} / ${taskCounter}` : title}</h1>
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
                    columnId={columnId}
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
        title={title}
        columnid={columnId}
      />
    </>
  )
}
