import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'

import { deleteTask } from '../../slices/dataSlice'
import './style.scss'

export default function Task({task, index, columnId}) {
  const [menuCollapse, setMenuCollapse] = useState(false)
  const dispatch = useDispatch()

  const handleTaskDelete = () => {
    dispatch(deleteTask({taskId: task.id, columnId}))
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
            {task.content}
            <div onClick={() => setMenuCollapse(!menuCollapse)}>
              <FontAwesomeIcon size='lg' icon="fa-solid fa-ellipsis" />
            </div>
            {menuCollapse && (
              <div className='task-menu'>
                <ul>
                  <li onClick={handleTaskDelete}>
                    <FontAwesomeIcon size='sm' icon="fa-solid fa-trash" />
                    Delete task
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </Draggable>
    </>
  )
}
