import { useDispatch, useSelector } from 'react-redux'

import { getBoard, setActiveBoard } from '../../state/reducers/board/slice'

import './style.scss'


export default function BoardIcon({ boardId, activeBoardId }) {
  const dispatch = useDispatch()
  const board = useSelector(state => getBoard(state, boardId))

  const changeActiveBoard = () => {
    dispatch(setActiveBoard({ boardId }))
  }

  const getCapitalizedLetters = (boardTitle) => {
    const words = boardTitle.trim().split(" ");
    let firstLetters = "";
  
    if (words.length > 1) {
      firstLetters += words[0].charAt(0).toUpperCase();
      firstLetters += words[1].charAt(0).toUpperCase();
    } else {
      firstLetters += words[0].charAt(0).toUpperCase();
      if (words[0].length > 1) {
        firstLetters += words[0].charAt(1).toUpperCase();
      }
    }
  
    return firstLetters;
  }
  return (
    <div className={`project-board-icon ${activeBoardId === boardId ? 'selected' : ''}`} onClick={changeActiveBoard}>
      {getCapitalizedLetters(board.title)}
    </div>
  )
}
