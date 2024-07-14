import React, { useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import clsx from 'clsx';
import './DatePicker.scss';

interface IDatePickerInput {
  name: string;
  label: string;
  required?: boolean;
}

const DatePickerInput = ({ name, label, required = false }: IDatePickerInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const datePickerRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    // @ts-ignore
    if (wrapperRef.current && !wrapperRef.current.contains(event.target) && datePickerRef.current) {
      // @ts-ignore
      datePickerRef.current.setBlur();
    }
  };

  const handleClick = () => {
    if (datePickerRef.current) {
      // @ts-ignore
      datePickerRef.current.setFocus();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={clsx('controlled-input-container')} ref={wrapperRef}>
      <div className="flex gap-1 items-center">
        {label && <label className="text-white">{label}</label>}
        <span className="font-[12px] text-skin-muted">{required ? '*' : '(Optional)'}</span>
      </div>
      <div
        className={clsx('controlled-input-wrapper flex flex-wrap gap-2', { 'has-error': errors[name] })}
        onClick={handleClick}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={null}
          rules={{ required }}
          render={({ field }) => (
            <DatePicker
              ref={datePickerRef}
              placeholderText="Select date and time"
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm:ss"
              timeCaption="time"
              className="bg-transparent text-xl outline-none w-full"
            />
          )}
        />
      </div>
    </div>
  );
};

export default DatePickerInput;
