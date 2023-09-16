import { Droppable } from "@hello-pangea/dnd";
import { styled } from "styled-components";
import { FaRegTrashCan } from "react-icons/fa6";

const TrashCanWrapper = styled.footer`
  position: fixed;
  bottom: 25px;
  right: 25px;
`;

const TrashCanIcon = styled(FaRegTrashCan)<{ $isDraggingOver: boolean }>`
  width: 3em;
  height: 3em;
  color: ${(props) => (props.$isDraggingOver ? "#ffeaa7" : "none")};
  transition: color 0.2s ease-in-out;
`;

export default function TrashCan() {
  return (
    <Droppable droppableId="trash">
      {(provided, snapshot) => (
        <>
          <TrashCanWrapper ref={provided.innerRef} {...provided.droppableProps}>
            <TrashCanIcon $isDraggingOver={snapshot.isDraggingOver} />
          </TrashCanWrapper>
        </>
      )}
    </Droppable>
  );
}
