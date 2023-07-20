'use client';

import TodoCard from '~/components/todo/TodoCard';
import useTodoStore from '~/hooks/useTodoStore';

const CardLayout = () => {
  const { getTodos } = useTodoStore();

  return (
    <div className="flex flex-col gap-4">
      {getTodos?.map((todo) => <TodoCard key={`${todo.title}_${todo.date}`} todo={todo} />)}
    </div>
  );
};

export default CardLayout;
