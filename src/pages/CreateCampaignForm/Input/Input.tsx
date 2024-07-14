import './Input.scss';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import ControlledInput, { InputPropsType } from '@/components/UiBlocks/ControlledInput/ControlledInput';

interface InputProps {
  name: string;
  label?: string;
  props?: InputPropsType;
  required?: boolean;
}

const Input = ({ label, name, props, required = false }: InputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const { setFocus, control } = useFormContext();

  const handleClick = () => {
    setFocus(name);
  };

  return (
    <div className={clsx('controlled-input-container')}>
      <div className="flex gap-1 items-center">
        {label && <label className="text-white">{label}</label>}
        <span className="font-[12px] text-skin-muted">{required ? '*' : '(Optional)'}</span>
      </div>
      <div
        className={clsx('controlled-input-wrapper flex flex-wrap gap-2 relative', { 'has-error': errors[name] })}
        onClick={handleClick}
      >
        <ControlledInput
          control={control}
          name={name}
          rules={{ required }}
          inputProps={{ placeholder: `Enter a ${label}`, ...props }}
        />
      </div>
    </div>
  );
};

export default Input;
