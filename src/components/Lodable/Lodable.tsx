import React from 'react';
import CicularProgress from '../UiBlocks/CicularProgress/CicularProgress';

export default function Lodable({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  if (loading)
    return (
      <div className="m-auto">
        <CicularProgress />
      </div>
    );
  return children;
}
