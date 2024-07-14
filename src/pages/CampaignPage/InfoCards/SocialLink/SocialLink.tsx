import React from 'react';
import { InfoLinkProps } from '../TaskBunnyCard/InfoLink/InfoLink';

export default function SocialLink({ icon, link, text }: InfoLinkProps) {
  return (
    <a className="bg-black/20 rounded min-h-6 flex justify-center gap-1.5 px-2 items-center" href={link} target='_blank'>
      {icon}
      <span className="text-content-primary text-xs font-medium">{text}</span>
    </a>
  );
}
