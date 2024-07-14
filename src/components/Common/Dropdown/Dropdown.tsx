import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from '@/hooks/useClickaway/useClickaway';
import DropdownIcon from 'public/assets/svgs/dropdown-icon.svg?react';
import clsx from 'clsx';

export interface IOption<Info = any> {
  id: string;
  title: string | JSX.Element | JSX.Element[];
  info?: Info;
}

interface IDropdownProps<Info = any> {
  list: IOption<Info>[];
  title?: string;
  direction?: 'left' | 'right';
  prefix?: string;
  selectedClass?: string;
  trustParent?: boolean; // depend on the value passed from parent not the local state value
  selectedOption?: IOption<Info>;
  dropdownClassName?: string;
  setter: (option: IOption<Info>) => void;
  renderSelected?: (option: IOption<Info>) => JSX.Element;
  renderOptions?: (option: IOption<Info>, selectedOptionId?: string) => JSX.Element;
}

const defaultRender = (option: IOption) => <span className="text-sm block mb-[-3px]">By {option?.title ?? ''}</span>;

const defaultOptionRender = (option: IOption) => (
  <span className="text-black text-sm whitespace-pre">{option.title}</span>
);

export default function Dropdown<Info>({
  list,
  direction = 'right',
  trustParent,
  setter,
  selectedOption,
  renderSelected = defaultRender,
  renderOptions = defaultOptionRender,
  dropdownClassName,
}: IDropdownProps<Info>) {
  const ref = useRef<HTMLDivElement>(null);

  const [currentOption, setCurrentOption] = useState<IOption<Info>>(list[0]);
  const [open, setOpen] = useState(false);

  const handleClick = (option: IOption) => {
    const setterFunction = trustParent ? setter : setCurrentOption;
    setterFunction(option);
  };
  const toggleOpen = () => setOpen(!open);

  useClickAway(ref, () => setOpen(false));

  useEffect(() => {
    setter(currentOption);
  }, [currentOption]);

  useEffect(() => {
    if (!selectedOption || selectedOption.id === currentOption.id) return;
    setCurrentOption(selectedOption);
  }, [selectedOption?.id]);

  return (
    <div className={clsx('relative font-itc-thin', dropdownClassName)} ref={ref} onClick={toggleOpen}>
      <div tabIndex={0} role="button" className="flex gap-2 items-center">
        {renderSelected(currentOption)}
        <DropdownIcon className={clsx({ 'rotate-180': open })} />
      </div>
      {open && (
        <ul
          tabIndex={0}
          className={clsx(
            'absolute  top-[130%] p-1 z-[1] menu shadow blured-gray-bg rounded-lg min-w-fit w-[calc(100%+20px)] flex flex-col gap-1 animate-fadeIn',
            { 'right-0': direction === 'right' },
            { 'left-0': direction === 'left' },
          )}
        >
          {list.map((option) => (
            <li
              key={option.id}
              onClick={() => handleClick(option)}
              className="hover:bg-white/30 p-2 rounded-md cursor-pointer "
            >
              {renderOptions(option, currentOption.id)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
