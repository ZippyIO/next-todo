'use client';

import { useQuery } from '@tanstack/react-query';

import { LuText, LuTag } from 'react-icons/lu';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/Select';

interface Props {
  priority: string;
  tag: string;
  setPriority: (val: string) => void;
  setTag: (val: string) => void;
}

const filter_priority = [
  { value: 'all', label: 'Priority' },
  { value: 'high', label: 'high' },
  { value: 'medium', label: 'medium' },
  { value: 'low', label: 'low' },
];

const TodoFilters = ({ priority, tag, setPriority, setTag }: Props) => {
  const { data: tags } = useQuery({
    queryFn: async () => {
      const res = await fetch('/api/todo/tags');

      return res.json() as unknown as string[];
    },
    queryKey: ['user-todo-tags'],
  });

  return (
    <div className="flex bg-black p-2">
      <Select onValueChange={setPriority} value={priority}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          {filter_priority.map((priority) => (
            <SelectItem key={priority.value} value={priority.value}>
              <span className="flex items-center gap-1">
                <LuText size={18} />
                {priority.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={setTag} value={tag}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <span className="flex items-center gap-1">
              <LuTag size={16} /> Tag
            </span>
          </SelectItem>
          {tags?.map((tag) => (
            <SelectItem key={tag} value={tag}>
              <span className="flex items-center gap-1">
                <LuTag size={16} />
                {tag}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TodoFilters;
