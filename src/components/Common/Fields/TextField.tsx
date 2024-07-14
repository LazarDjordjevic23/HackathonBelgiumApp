import React from 'react';
import clsx from 'clsx';
import './Fields.scss';

const defaultValidator = (value) => true;

export default function TextField({ id, label, error, ...rest }) {
  const { value = '', renderValue, tag, onChange, disabled } = rest;
  const defaultEventObj = { target: { value } };

  const validatedOnChange = (e = defaultEventObj) => {
    let {
      target: { value },
    } = e;
    onChange(e);
  };

  const color = clsx({ '#5B5B5B': disabled, white: !disabled });
  return (
    <input
      type="text"
      id={id}
      {...rest}
      style={{ ...rest?.style, color }}
      className={clsx('field-wrapper text-sm border border-gray-500 px-2 rounded-md text-gray-200', rest?.className, { 'border-error-content': !!error })}
      onChange={validatedOnChange}
      value={renderValue ? renderValue(value) : value || ''}
    />
  );
}
