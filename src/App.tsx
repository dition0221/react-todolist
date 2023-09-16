import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import styled, { keyframes } from "styled-components";
import { useRecoilState } from "recoil";
// Atoms
import { toDoState } from "./atoms";
// Images
import windows98 from "./images/windows98.jpg";
// Components
import Board from "./components/Board";
import AddBoard from "./components/AddBoard";
import TrashCan from "./components/TrashCan";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 3vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fadeOutAnime = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const FADE_OUT_ANIME_TIME = 1;

const ImgWindows98 = styled.img`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  object-fit: cover;
  z-index: 99;
  animation: ${fadeOutAnime} ${FADE_OUT_ANIME_TIME * 0.4}s ease-in-out
    ${FADE_OUT_ANIME_TIME * 0.7}s;
`;

const Boards = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  flex-wrap: wrap;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { source, destination } = info;
    // No movement
    if (!destination) return;
    // Delete to trashcan
    if (destination.droppableId === "trash") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1); // Delete
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
      return;
    }
    // Movement within the same board
    if (source.droppableId === destination?.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const targetObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1); // 1) Delete
        boardCopy.splice(destination?.index, 0, targetObj); // 2) Put back
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    // Movement to different boards
    if (source.droppableId !== destination.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const targetObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1); // 1) Delete
        destinationBoard.splice(destination?.index, 0, targetObj); // 2) Put back
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  // ImgWindows98
  const [isExist, setIsExist] = useState(true);
  useEffect(() => {
    const imgFadeOut = setTimeout(
      () => setIsExist(false),
      FADE_OUT_ANIME_TIME * 1000
    );
    return () => clearTimeout(imgFadeOut);
  }, []);

  return (
    <Wrapper>
      {isExist ? <ImgWindows98 src={windows98} /> : null}
      <AddBoard />
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <TrashCan />
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
