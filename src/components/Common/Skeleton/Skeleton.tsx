import clsx from 'clsx';
import React from 'react';

export interface ISkeletonProps {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
  mockChildren?: JSX.Element | JSX.Element[];
  loading: boolean;
  style?: React.CSSProperties;
  length?: number;
  wrapperClass?: string;
}

export const Skeleton: React.FC<ISkeletonProps> = ({
  className,
  length = 1,
  children,
  mockChildren,
  loading,
  wrapperClass,
  ...rest
}) => {
  const baseCLassName = (loading && 'animate-pulse bg-white/20  rounded-md') || '';
  const mergedClassName = [baseCLassName, className].join(' ');
  return (
    <>
      {loading ? (
        <div className={clsx('flex flex-col ', wrapperClass)}>
          {Array.from({ length }, (elem, index) => (
            <div className={mergedClassName} style={rest?.style}>
              {mockChildren}
            </div>
          ))}
        </div>
      ) : (
        children
      )}
    </>
  );
};
