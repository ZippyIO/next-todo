'use client';

import clsx from 'clsx';
import { LuCheck, LuChevronDown, LuXCircle } from 'react-icons/lu';
import {
  type ClearIndicatorProps,
  components,
  type DropdownIndicatorProps,
  type MultiValueRemoveProps,
  type OptionProps,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string[];
  options: readonly Option[];
  onValueChange: (value: string[]) => void;
}

const MultiValueRemove = (props: MultiValueRemoveProps<Option>) => {
  return (
    <components.MultiValueRemove {...props}>
      <LuXCircle size={14} className="hover:fill-red-500" />
    </components.MultiValueRemove>
  );
};

const MultiSelectOption = (props: OptionProps<Option>) => {
  return (
    <components.Option {...props}>
      {props.isSelected ? (
        <>
          <LuCheck className="h-4 w-4" />
          {props.children}
        </>
      ) : (
        <>{props.children}</>
      )}
    </components.Option>
  );
};

const ClearIndicator = (props: ClearIndicatorProps<Option>) => {
  return <components.ClearIndicator {...props}>Clear all</components.ClearIndicator>;
};

const DropdownIndicator = (props: DropdownIndicatorProps<Option>) => {
  return (
    <components.DropdownIndicator {...props}>
      <LuChevronDown className="h-4 w-4 opacity-50" />
    </components.DropdownIndicator>
  );
};

const MultiSelect = ({ value, onValueChange, options }: Props) => {
  const onChange = (option: readonly Option[]) => {
    const values = option.map(({ value }) => value);
    onValueChange(values);
  };

  const mappedValue = value.map((value) => ({ value, label: value }));

  return (
    <CreatableSelect
      value={mappedValue}
      onChange={onChange}
      options={options}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      unstyled
      components={{
        MultiValueRemove,
        Option: MultiSelectOption,
        ClearIndicator,
        DropdownIndicator,
      }}
      classNames={{
        control: () => 'bg-black border border-input p-2 rounded-md',
        placeholder: () => '!text-xs',
        clearIndicator: () => '!text-xs text-zinc-400 hover:text-zinc-500 cursor-pointer',
        valueContainer: () => 'gap-2',
        multiValue: () => 'bg-blue-500 p-1 rounded-md text-xs !flex items-center gap-1',
        multiValueLabel: () => 'text-white',
        menu: () => 'bg-black border border-input rounded-md overflow-hidden p-1',
        menuList: () => ' flex flex-col gap-1',
        option: ({ isFocused, isSelected }) =>
          clsx(
            isSelected && '!flex items-center gap-1.5',
            isFocused && '!bg-accent',
            'rounded-md bg-black p-2 !text-sm',
          ),
      }}
    />
  );
};

export default MultiSelect;
