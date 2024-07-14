import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { TweetsTab } from '../../../pages/Home/Tweets/Tweets';
import clsx from 'clsx';
import './TabPicker.scss';
import { useWindowWidth } from '@/hooks/useWidth';

export interface ISingleTab<ID = string> {
  id: ID;
  title: string;
  tabClassName?: string;
  hiddenAt?: boolean;
  extraTabContent?: JSX.Element;
}

interface TabPickerProps<T extends string> {
  tabs: ISingleTab[];
  currentTab: T;
  setCurrentTab: React.Dispatch<React.SetStateAction<T>>;
  sessionStorageKey?: string;
}

const DEFAULT_TAB_WIDTH = 160;

export default function TabPicker<T extends string>({
  tabs,
  currentTab,
  setCurrentTab,
  sessionStorageKey,
}: TabPickerProps<T>) {
  const [tabWidth, setTabWidth] = useState(DEFAULT_TAB_WIDTH);
  const windowWidth = useWindowWidth();
  const ref = useRef<(HTMLDivElement | null)[]>([]);
  // Find the index of the current tab
  const currentIndex = tabs.findIndex((tab) => tab.id === currentTab);

  // Calculate the left position for the toggle-thumb
  const thumbPosition = currentIndex * tabWidth;

  useEffect(() => {
    const tabElementWidth = ref?.current?.[0]?.scrollWidth || DEFAULT_TAB_WIDTH;
    setTabWidth(tabElementWidth);
  }, [windowWidth, tabs]);

  // Setting tab in session storage if key is avaliable
  useEffect(() => {
    if (!sessionStorageKey) return;
    sessionStorage.setItem(sessionStorageKey, currentTab);
  }, [currentTab]);

  return (
    <div className="tab-picker flex bg-box-secondary rounded-[8px] p-2 relative w-full">
      <div
        className={clsx(
          'toggle-thumb bg-secondary !text-content-secondary rounded-[8px] z-[1] transition-transform duration-200 ease-in-out h-[34px]',
        )}
        style={{ transform: `translateX(${thumbPosition}px)`, width: tabWidth }}
      ></div>
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          onClick={() => setCurrentTab(tab.id as SetStateAction<T>)}
          className={clsx(
            'flex-1 flex-grow text-center cursor-pointer rounded-[8px] h-[34px] flex-center z-[2]',
            tab.id !== currentTab && '!font-[300]',
          )}
          ref={(el) => (ref.current[i] = el)}
        >
          <span
            className={clsx('text-sm', {
              'text-content-tertiary font-normal': tab.id !== currentTab,
              'text-content-secondary font-[600]': tab.id === currentTab,
            })}
          >
            {tab.title}
          </span>
        </div>
      ))}
    </div>
  );
}
