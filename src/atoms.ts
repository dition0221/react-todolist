import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "To-Do list",
});

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    Tutorial: [
      {
        id: 1,
        text: "[보드 추가] 우측 상단 '+'버튼을 통해 새로운 보드를 추가할 수 있습니다.",
      },
      {
        id: 2,
        text: "[보드 삭제] 보드의 'x'버튼을 클릭해 보드를 삭제할 수 있습니다.",
      },
      {
        id: 3,
        text: "[To-Do 추가] 보드 상단 input에서 입력해 To-Do를 추가할 수 있습니다.",
      },
      {
        id: 4,
        text: "[To-Do 순서 변경] To-Do를 드래그하여 순서를 변경할 수 있습니다.",
      },
      {
        id: 5,
        text: "[To-Do 삭제] To-Do를 쓰레기통에 드래그앤드롭으로 삭제할 수 있습니다.",
      },
    ],
  },
  effects_UNSTABLE: [persistAtom],
});
