import { Field } from '@/components/Common/Fields/Fields';
import clsx from 'clsx';
import React from 'react';

interface ITextField extends Field {
  onChange: (name: string, value: any) => void;
}

export const TextField = ({ label, name, type, onChange }: ITextField) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(name, e.target.value);
  };

  return (
    <div className={clsx('w-full')}>
      {label && <label className="text-white">{label}</label>}
      <div className={clsx('controlled-input-wrapper flex flex-wrap gap-2')}>
        <input type={type} placeholder={`Enter a ${label}`} onChange={handleChange} className='input input-bordered w-full border-gray-300  mt-3 text-white' />
      </div>
    </div>
  );
};
