import { useEffect, useRef, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'

import Task from '../Task'
import { createNewTask } from '../../slices/dataSlice'
import './style.scss'


export default function Column({title, columnId, tasks}) {
  const [menuCollapse, setMenuCollapse] = useState(false)
  const [showTaskCounter, setShowTaskCounter] = useState(true)
  const [taskCounter, setTaskCounter] = useState(0)

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
  
  return (
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
  )
}
