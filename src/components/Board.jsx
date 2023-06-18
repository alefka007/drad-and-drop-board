import {useState} from "react";

export const Board = ({boardData}) => {

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [boards, setBoards] = useState(boardData);


  const dragOverHandle = (e) => {
    e.preventDefault();
    if(e.target.className === 'boardItem') {
      e.target.style.background = '#545e72';
    }
  }

  const dragLeaveHandle = (e) => {
    e.target.style.background = '#7bad9f';
  }

  const dragStartHandle = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  const dragEndHandle = (e) => {
    e.target.style.background = '#7bad9f';
  }

  const dropHandle = (e, board, item) => {
    e.preventDefault();
    e.stopPropagation();

    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);

    board.items.splice(dropIndex + 1, 0, currentItem );

    setBoards(boards.map(b => {
      if(b.id === board.id) {
        return board
      }

      if(b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))

    e.target.style.background = '#7bad9f';

  }

  const dropCardHandle = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    setBoards(boards.map(b => {
      if(b.id === board.id) {
        return board
      }

      if(b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))

    e.target.style.background = '#5d7680';
  }


  return (
    <div className={'boardContainer'}>
      {boards.map(board => (
        <div
          onDragOver={e => dragOverHandle(e)}
          onDrop={e => dropCardHandle(e, board)}
          className={'board'}>
          <div className={'boardTitle'}>{board.title}</div>
          <div className={'boardItems'}>
            {board.items.map(item => (
              <div
                onDragOver={e => dragOverHandle(e)}
                onDragLeave={e => dragLeaveHandle(e)}
                onDragStart={e => dragStartHandle(e, board, item)}
                onDragEnd={e => dragEndHandle(e)}
                onDrop={e => dropHandle(e, board, item)}
                draggable={true}
                key={item.id}
                className={'boardItem'}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}