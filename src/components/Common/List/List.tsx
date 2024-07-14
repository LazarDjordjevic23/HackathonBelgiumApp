import React from 'react';

interface IList<type = any> {
  list: type[];
  emptyText: React.ReactNode;
  render: (elem:type) => React.ReactNode;
}
export default function List<type = any>({ list, render, emptyText }: IList<type>) {
  if (!Array.isArray(list)) return <></>;
  if (!list.length) return emptyText;

  return <>{list.map(render)}</>;
}
