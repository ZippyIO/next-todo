'use client';

import { useQuery } from '@tanstack/react-query';

import TodoCard, { type Todo } from '~/components/todo/TodoCard';

const TodoCardLayout = () => {
  const { data } = useQuery({
    queryFn: async () => {
      const res = await fetch('/api/todo');

      return res.json() as unknown as Todo[];
    },
    queryKey: ['user-todos'],
  });

  return (
    <div className="flex flex-col gap-4">
      {data?.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
    </div>
  );
};

export default TodoCardLayout;
