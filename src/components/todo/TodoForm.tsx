'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as Icons from 'react-icons/di';
import type * as z from 'zod';

import { Button } from '~/components/ui/Button';
import { Calendar } from '~/components/ui/Calendar';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/Form';
import { Input } from '~/components/ui/Input';
import MultiSelect from '~/components/ui/MultiSelect';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/Popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/Select';
import { Textarea } from '~/components/ui/TextArea';
import { useToast } from '~/hooks/use-toast';
import { cn } from '~/lib/utils';
import { type TodoCreationRequest, TodoValidator } from '~/lib/validators/todo';

const tags = [
  { value: 'Work', label: 'Work' },
  { value: 'Home', label: 'Home' },
  { value: 'Personal', label: 'Personal' },
];

const FormSchema = TodoValidator.omit({ createdAt: true, updatedAt: true });

const TodoForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      note: undefined,
      priority: '',
      tags: [],
      icon: '',
      dueDate: new Date(),
    },
  });

  const { mutate: createTodo } = useMutation({
    mutationFn: async ({
      title,
      note,
      priority,
      tags,
      icon,
      dueDate,
      createdAt,
      updatedAt,
    }: TodoCreationRequest) => {
      const payload: TodoCreationRequest = {
        title,
        note,
        priority,
        tags,
        icon,
        dueDate,
        createdAt,
        updatedAt,
      };
      const res = await fetch('/api/todo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      return res;
    },

    onSuccess: () => {
      router.refresh();
      toast({
        title: 'Created new Todo!',
        variant: 'success',
      });
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    toast({
      title: 'Creating new Todo...',
      variant: 'info',
    });

    createTodo({
      title: values.title,
      note: values.note,
      priority: values.priority,
      tags: values.tags,
      icon: values.icon,
      dueDate: values.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
                name="dueDate"
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
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiSelect
                        defaultValue={null}
                        onValueChange={field.onChange}
                        options={tags}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-2/5 gap-2">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Priority</FormLabel>
                      <Select required onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Icon</FormLabel>
                      <Select required onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent viewportClassname="p-2 gap-1 grid grid-cols-[repeat(6,1fr)] items-center justify-center content-center">
                          {Object.entries(Icons).map(([name, Icon]) => (
                            <SelectItem
                              key={name}
                              value={name}
                              className="h-[24px] w-[24px] items-center justify-center p-4"
                            >
                              <Icon size={24} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea rows={10} className="resize-none" {...field} />
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
