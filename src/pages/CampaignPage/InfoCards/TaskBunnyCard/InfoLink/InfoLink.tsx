import React from 'react';

export interface InfoLinkProps {
  icon: React.ReactNode;
  link: string;
  text: string;
}

export default function InfoLink({ icon, link, text }: InfoLinkProps) {
  return (
    <a className="flex gap-2 items-center cursor-pointer" href={link} target="_blank">
      {icon}
      <span>{text}</span>
    </a>
  );
}
