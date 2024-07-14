import clsx from 'clsx';

interface ILink {
  to: string;
  children: string | JSX.Element;
  className?: string;
}

const Link = ({ to, children, className }: ILink) => {
  return (
    <a
      href={to}
      draggable="false"
      target="_blank"
      rel="noreferrer"
      className={clsx('no-underline w-full', className)}
    >
      {children}
    </a>
  );
};

export default Link;
