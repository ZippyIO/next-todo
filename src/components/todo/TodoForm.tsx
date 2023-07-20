'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Textarea } from '~/components/ui/textarea';
import useTodoStore from '~/hooks/useTodoStore';
import { cn } from '~/lib/utils';

const formSchema = z.object({
  title: z.string().min(1),
  date: z.date(),
  content: z.string().optional(),
});

const TodoForm = () => {
  const { setTodos } = useTodoStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: new Date(),
      content: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setTodos({ title: values.title, date: values.date.toISOString(), content: values.content });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Create Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex w-3/5 flex-col">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Wash clothes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex w-2/5 flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="secondary" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
