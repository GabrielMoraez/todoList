import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createColumn } from '../../slices/dataSlice'
import { useSelector, useDispatch } from 'react-redux'

import './style.scss'

export default function Header() {
  const data = useSelector((state) => state.data)
  const dispatch = useDispatch()

  const columnIds = data.columnOrder

  const handleCreateColumn = () => {
    const sortedIds = [...columnIds].sort()
    const lastColumnId = sortedIds[columnIds.length - 1]
    const newColumnId = `column-${Number((lastColumnId).split('-')[1]) + 1}`

    const newColumn = {
      id: newColumnId,
      title: 'New Column',
      taskIds: []
    }

    dispatch(createColumn({newColumn}))

  }
  return (
    <div className='header'>
      <div className='logo-wrapper'>
        <h1>TODO LIST</h1>
      </div>
      <div className='header-menu-wrapper'>
        <ul>
          <li onClick={handleCreateColumn}>
            <FontAwesomeIcon size='lg' icon="fa-solid fa-plus" />
            Create Column
          </li>
        </ul>
      </div>
    </div>
  )
}
