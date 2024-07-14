import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type TextArePropsType = TextareaHTMLAttributes<HTMLTextAreaElement>;

interface IControlledTextArea {
  //   control: Control<FieldValues>;
  name: string;
  textAreaProps?: TextArePropsType;
  rules: any;
}

const ControlledTextArea = ({ name, textAreaProps, rules }: IControlledTextArea) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <textarea className={clsx({ 'has-error': errors[name] })} {...field} {...textAreaProps} />
      )}
    />
  );
};

export default ControlledTextArea;
