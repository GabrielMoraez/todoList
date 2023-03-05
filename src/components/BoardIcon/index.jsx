import { useDispatch } from 'react-redux'
import { setActiveBoard } from '../../slices/dataSlice'

import './style.scss'


export default function BoardIcon({ boardId, board, activeBoardId }) {
  const dispatch = useDispatch()

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
