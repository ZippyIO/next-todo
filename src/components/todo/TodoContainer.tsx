'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import TodoCard, { type Todo } from '~/components/todo/TodoCard';
import TodoFilters from '~/components/todo/TodoFilters';
import { Skeleton } from '~/components/ui/Skeleton';

const TodoContainer = () => {
  const [priority, setPriority] = useState('all');
  const [tag, setTag] = useState('all');

  const { data } = useQuery({
    queryFn: async () => {
      const res = await fetch('/api/todo');

      return res.json() as unknown as Todo[];
    },
    queryKey: ['user-todos'],
  });

  const filteredTodos = useMemo(() => {
    if (!data) return undefined;

    if (priority === 'all' && tag === 'all') return data;

    if (priority !== 'all' && tag === 'all') {
      return data.filter((todo) => todo.priority === priority);
    }

    if (priority === 'all' && tag !== 'all') {
      return data.filter((todo) => todo.tags.includes(tag));
    }

    if (priority !== 'all' && tag !== 'all') {
      return data.filter((todo) => todo.tags.includes(tag) && todo.priority === priority);
    }
  }, [priority, tag, data]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-full">
        <TodoFilters priority={priority} setPriority={setPriority} tag={tag} setTag={setTag} />
      </div>
      <div className="flex flex-col gap-4">
        {filteredTodos ? (
          filteredTodos?.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        ) : (
          <Skeleton className="h-[250px] w-[600px] bg-zinc-900" />
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
