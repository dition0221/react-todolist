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
    // "To Do": [],
    // Doing: [],
    // Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
