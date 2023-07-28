'use client';

import { type Todo as PrismaTodo } from '@prisma/client';

import { format, parseISO } from 'date-fns';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export interface Todo extends Omit<PrismaTodo, 'date'> {
  date: string;
}

const TodoCard = ({ todo }: { todo: Todo }) => {
  return (
    <Card className="max-w-prose">
      <CardHeader>
        <CardTitle>{todo.title}</CardTitle>
        <CardDescription>{format(parseISO(todo.date), 'dd/MM/yyy')}</CardDescription>
      </CardHeader>
      <CardContent>{todo.note}</CardContent>
    </Card>
  );
};

export default TodoCard;
