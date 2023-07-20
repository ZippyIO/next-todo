import { create } from 'zustand';

export interface Todo {
  title: string;
  date: string;
  content: string | undefined;
}

interface TodoStore {
  getTodos: Todo[];
  setTodos: (todo: Todo) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  getTodos:
    typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('todos') || '[]') : null,
  setTodos: (todo) =>
    set((state) => {
      if (typeof window !== 'undefined')
        window.localStorage.setItem('todos', JSON.stringify([...state.getTodos, todo]));
      return { ...state, todo: [...state.getTodos, todo] };
    }),
}));

export default useTodoStore;
