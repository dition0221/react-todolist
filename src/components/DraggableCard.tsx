import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { styled } from "styled-components";

const Card = styled.div<{ $isDragging: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: ${(props) =>
    props.$isDragging
      ? "linear-gradient(to right, pink, skyblue)"
      : "linear-gradient(to right, #dfe6e9, #b2bec3)"};
  box-shadow: ${(props) =>
    props.$isDragging ? "0 3px 5px rgba(0, 0, 0, 0.3)" : "none"};
  border: 1px solid
    ${(props) => (props.$isDragging ? "#a29bfe" : "rgba(0, 0, 0, 0.3)")};
  font-weight: 500;
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
