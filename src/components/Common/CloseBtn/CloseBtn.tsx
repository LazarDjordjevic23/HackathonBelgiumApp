import IconX from '@/assets/svgs/icon-x.svg?react';

const CloseBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="absolute top-[24px] right-[24px] z-index-[2002] flex transition-50 p-2 bg-transparent border-none pointer rounded-[8px] hover:bg-primary-200"
      onClick={() => {
        onClick();
      }}
    >
      <IconX className="fill-secondary" />
    </button>
  );
};

export default CloseBtn;
