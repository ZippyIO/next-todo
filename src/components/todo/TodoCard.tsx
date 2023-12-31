'use client';

import { type Todo as PrismaTodo } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { BsFillCircleFill } from 'react-icons/bs';

import { Button } from '~/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/Card';
import DynamicIcon from '~/components/ui/DynamicIcon';
import { type TodoIdRequest } from '~/lib/validators/todo';

export interface Todo extends Omit<PrismaTodo, 'dueDate' | 'createdAt' | 'updatedAt'> {
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

const TodoCard = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async ({ todoId }: TodoIdRequest) => {
      const payload: TodoIdRequest = {
        todoId,
      };

      const res = await fetch('/api/todo/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-todos']);
    },
  });

  const handleDeleteTodo = () => {
    deleteTodo({
      todoId: todo.id,
    });
  };

  return (
    <Card className="max-w-prose">
      <CardHeader>
        <CardTitle className="flex items-end gap-2 text-2xl text-zinc-300">
          <DynamicIcon
            library="di"
            icon={todo.icon}
            fallback={<BsFillCircleFill size="36px" className="fill-zinc-900" />}
            className="fill-zinc-500"
            size="36px"
          />
          {todo.title}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <div className="flex gap-2">
          <div className="flex w-full flex-col items-stretch gap-1 text-xs text-zinc-400">
            <p className="text-xs font-semibold text-zinc-300">Properties</p>
            <p>
              <span className="font-medium">Due:</span>{' '}
              <span>{todo.dueDate && format(parseISO(todo.dueDate), 'dd/MM/yyy')}</span>
            </p>
            <div className="flex gap-1">
              <span className="font-medium">Priority:</span>
              <span
                className={clsx(
                  'rounded-md px-2',
                  todo.priority === 'high' && 'bg-red-500 text-white',
                  todo.priority === 'medium' && 'bg-amber-500 text-white',
                  todo.priority === 'low' && 'bg-green-500 text-white',
                )}
              >
                {todo.priority}
              </span>
            </div>
            <div className="flex gap-1">
              <span className="font-medium">Tags:</span>
              {todo.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-blue-500 px-2 text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="border-x-2 border-zinc-800" />
        </div>
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-xs font-semibold text-zinc-300">Note</p>
          <p className="text-sm text-zinc-300">{todo.note}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={handleDeleteTodo}>
          Delete Todo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
