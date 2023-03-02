import { Draggable } from 'react-beautiful-dnd'

export default function Task({task, index}) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='task'
        >
          {task.content}
        </div>
      )}
    </Draggable>
  )
}
