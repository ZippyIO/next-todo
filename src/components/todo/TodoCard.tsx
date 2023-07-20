'use client';

import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { type Todo } from '~/hooks/useTodoStore';

const TodoCard = ({ todo }: { todo: Todo }) => {
  return (
    <Card className="max-w-prose">
      <CardHeader>
        <CardTitle>{todo.title}</CardTitle>
        <CardDescription>{format(parseISO(todo.date), 'dd/MM/yyy')}</CardDescription>
      </CardHeader>
      <CardContent>{todo.content}</CardContent>
    </Card>
  );
};

export default TodoCard;
