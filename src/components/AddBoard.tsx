import { useState } from "react";
import { styled } from "styled-components";
import { FaCirclePlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
// Interface & Atoms
import { toDoState } from "../atoms";

const AddButton = styled.button`
  position: fixed;
  top: 25px;
  right: 25px;
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  cursor: pointer;
`;

const AddButtonIcon = styled(FaCirclePlus)`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  &:hover {
    color: #fffb9d;
    box-shadow: 0 0 10px 1px #fffb9d;
  }
  transition: all 0.3s ease-in-out;
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  z-index: 99;
`;

const ModalWindow = styled.div`
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  border: 3px solid ${(props) => props.theme.boardColor};
  box-shadow: 2px 2px 1px black;
`;

const Title = styled.h2`
  background: linear-gradient(to right, rgb(0, 0, 128), rgb(16, 132, 208));
  color: white;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  padding: 3px 0;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 15px;
  input {
    width: 100%;
    height: 25px;
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-right: 2px solid rgba(0, 0, 0, 0.5);
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    padding-left: 10px;
    &::placeholder {
      font-size: 16px;
      font-style: italic;
    }
  }
  button {
    background-color: ${(props) => props.theme.boardColor};
    height: 100%;
    margin-left: 10px;
    cursor: pointer;
    &::first-letter {
      text-transform: uppercase;
      text-decoration: underline;
    }
  }
`;

const ErrorSpan = styled.span`
  text-align: center;
  font-weight: 600;
  color: red;
  text-decoration: underline;
`;

interface IForm {
  keyName: string;
}

function AddBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    // Close modal-box when click outside of modal-box
    if (event.currentTarget === event.target) {
      setIsModalOpen(false);
    }
  };

  /* form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const [toDoList, setToDoList] = useRecoilState(toDoState);

  // Add new board to 'toDoState'
  const onValid = ({ keyName }: IForm) => {
    const toDoListCopy = { ...toDoList };
    // Error : 중복
    if (Object.keys(toDoListCopy).includes(keyName)) {
      setError("keyName", { message: "Not allow duplicate values." });
      return;
    }
    // Success
    toDoListCopy[keyName] = [];
    setToDoList(toDoListCopy); // Add new board
    reset();
    setIsModalOpen(false); // Close modal-box
  };

  // TODO : 모달박스 만들기
  return (
    <>
      <AddButton onClick={openModal}>
        <AddButtonIcon />
      </AddButton>

      {isModalOpen ? (
        <ModalOverlay onClick={closeModal}>
          <ModalWindow>
            <Title>Add Board</Title>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("keyName", {
                  required: "Not allow empty values.",
                  maxLength: {
                    value: 12,
                    message: "The maximum input character is 12.",
                  },
                })}
                type="text"
                placeholder="Write title of board"
              />
              <button>Save</button>
            </Form>
            <ErrorSpan>{errors.keyName?.message}</ErrorSpan>
          </ModalWindow>
        </ModalOverlay>
      ) : null}
    </>
  );
}

export default AddBoard;
