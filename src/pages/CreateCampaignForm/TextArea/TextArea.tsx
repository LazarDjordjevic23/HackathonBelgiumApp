import ControlledTextArea from '@/components/UiBlocks/ControlledTextArea/ControlledTextArea';
import './TextArea.scss';

const TextArea = ({ name, required = false, label = 'Description' }) => {
  return (
    <div className="textarea-wrapper">
      <div className="flex gap-1 items-center">
        {label && <label className="text-white">{label}</label>}
        <span className="font-[12px] text-skin-muted">{required ? '*' : '(Optional)'}</span>
      </div>
      <ControlledTextArea name={name} textAreaProps={{ placeholder: 'Enter a description' }} rules={{ required }} />;
    </div>
  );
};

export default TextArea;
