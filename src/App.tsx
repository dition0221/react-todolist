import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
// Atoms
import { toDoState } from "./atoms";
// Components
import Board from "./components/Board";
import AddBoard from "./components/AddBoard";
import TrashCan from "./components/TrashCan";

const Wrapper = styled.div`
  width: 100%;
  margin: 5vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
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

  return (
    <Wrapper>
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
