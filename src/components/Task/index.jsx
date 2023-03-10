import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { deleteTask, editTask, fullDeleteTask } from '../../slices/task/taskSlice'
import './style.scss'

const PRIORITY = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
}

export default function Task({task, index, columnId}) {
  const [menuCollapse, setMenuCollapse] = useState(false)
  const [taskCollapse, setTaskCollapse] = useState(false)

  const dispatch = useDispatch()

  const handleTaskDelete = () => {
    dispatch(fullDeleteTask({taskId: task.id, columnId}))
  }

  const handleOpenTask = () => {
    setMenuCollapse(!menuCollapse)
    setTaskCollapse(!taskCollapse)
  }

  function EditTaskModal() {
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [taskDescription, setTaskDescription] = useState(task.description)
    const [taskPriority, setTaskPriority] = useState(task.priority)

    const handleEditTask = () => {
      const editedTask = {
        ...task,
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority
      }
  
      dispatch(editTask({ taskId: task.id, editedTask }))
      setTaskCollapse(false)
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
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>Task description</h4>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              cols={50}
              rows={5}
            />
          </div>
          <div>
            <h4>Task Priority</h4>
            <select
              value={task.priority}
              onChange={(e) => setTaskPriority(e.target.value)}
            >
              {
                Object.entries(PRIORITY).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))
              }
            </select>
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
      <Draggable draggableId={task.id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='task'
          >
            <div className='task-header'>
              {task.title}
              <div onClick={() => setMenuCollapse(!menuCollapse)} className='task-menu-wrapper'>
                <FontAwesomeIcon size='lg' icon="fa-solid fa-ellipsis" />
              </div>
              {menuCollapse && (
                <div className='task-menu'>
                  <ul>
                    <li onClick={handleTaskDelete}>
                      <FontAwesomeIcon size='sm' icon="fa-solid fa-trash" />
                      Delete task
                    </li>
                    <li onClick={handleOpenTask}>
                      <FontAwesomeIcon size='sm' icon="fa-solid fa-pencil" />
                      Edit task
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className='task-priority'>
              <span className={`priority-label ${PRIORITY[task.priority]}`}>{PRIORITY[task.priority]}</span>
            </div>
            <div className='task-body'>
              {task.description}
            </div>
          </div>
        )}
      </Draggable>
      <EditTaskModal
        show={taskCollapse}
        onHide={() => setTaskCollapse(false)}
      />
    </>
  )
}
