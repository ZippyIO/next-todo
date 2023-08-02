'use client';

import { useQuery } from '@tanstack/react-query';

import TodoCard, { type Todo } from '~/components/todo/TodoCard';
import { Skeleton } from '~/components/ui/Skeleton';

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
      {data ? (
        data?.map((todo) => <TodoCard key={todo.id} todo={todo} />)
      ) : (
        <Skeleton className="h-[250px] w-[600px] bg-zinc-900" />
      )}
    </div>
  );
};

export default TodoCardLayout;
