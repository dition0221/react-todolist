import { Droppable } from "@hello-pangea/dnd";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { FaXmark, FaRegFolderOpen, FaCaretDown } from "react-icons/fa6";
// Interface & Atoms
import { IToDo, toDoState } from "../atoms";
// Components
import DraggableCard from "./DraggableCard";

const Wrapper = styled.section`
  width: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border: 3px solid ${(props) => props.theme.boardColor};
  box-shadow: 2px 2px 1px black;
`;

const Header = styled.header`
  background: linear-gradient(to right, rgb(0, 0, 128), rgb(16, 132, 208));
  padding: 3px 10px;
  border-bottom: 3px solid ${(props) => props.theme.boardColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`;

const FolderIcon = styled(FaRegFolderOpen)`
  margin-right: 5px;
  color: #fffb9d;
`;

const DeleteButton = styled.button`
  border: none;
  padding: 0;
  background-color: ${(props) => props.theme.boardColor};
  box-shadow: 0 0 4px black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButtonIcon = styled(FaXmark)`
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: red;
  }
  transition: color 0.2s ease-in-out;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  color: white;
`;

const Form = styled.form`
  width: 100%;
  padding: 5px 8px 5px;
  background-color: ${(props) => props.theme.boardColor};
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  input {
    width: 100%;
    &::placeholder {
      font-style: italic;
    }
  }
`;

const DownIcon = styled(FaCaretDown)`
  height: 100%;
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-left: none;
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const Area = styled.article<IAreaProps>`
  padding: 10px;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#ffeaa7"
      : props.$isDraggingFromThis
      ? "#b2bec3"
      : "#fefefe"};
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: 3px solid ${(props) => props.theme.boardColor};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
`;

interface IForm {
  toDo: string;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const setToDoState = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDoState((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    reset();
  };

  // TODO : Delete button
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) =>
    console.log(event);

  return (
    <Wrapper>
      <Header>
        <div>
          <FolderIcon />
          <Title>{boardId}</Title>
        </div>
        <DeleteButton onClick={onDelete}>
          <DeleteButtonIcon />
        </DeleteButton>
      </Header>

      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
        <DownIcon />
      </Form>

      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
