'use client';

import clsx from 'clsx';
import CreatableSelect from 'react-select/creatable';

interface Option {
  value: string;
  label: string;
}

interface Props {
  defaultValue?: Option | null;
  options: Option[];
  onValueChange: (value: string[]) => void;
}

const MultiSelect = ({ defaultValue, onValueChange, options }: Props) => {
  const onChange = (option: readonly Option[]) => {
    const values = option.map(({ value }) => value);
    console.log(values);
    onValueChange(values);
  };
  return (
    <CreatableSelect
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      unstyled
      classNames={{
        control: () => 'bg-zinc-900 p-2 rounded-md border-none',
        valueContainer: () => 'gap-2',
        multiValue: () => 'bg-blue-500 p-1 rounded-md text-xs',
        multiValueLabel: () => 'text-white',
        menu: () => 'bg-zinc-900 rounded-md overflow-hidden',
        option: ({ isFocused, isSelected }) =>
          clsx(isSelected && '!bg-blue-500', isFocused && '!bg-zinc-800', 'bg-zinc-900 p-2'),
      }}
    />
  );
};

export default MultiSelect;
