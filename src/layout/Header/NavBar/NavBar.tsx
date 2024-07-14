import React from 'react';
import { Link } from 'react-router-dom';

type Link = {
  title: string;
  href: string;
};

const linkList: Link[] = [
  { title: 'About', href: '#about' },
  { title: 'Tokenomics', href: '#tokenomics' },
  { title: 'Contact', href: '#contact' },
  { title: 'Social', href: '#social' },
  { title: 'App', href: '#app' },
];

export default function NavBar() {
  return (
    <nav className="gap-[10px] md:gap-[50px] hidden md:flex z-100">
      {linkList.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="text-sm opacity-60 hover:opacity-80 text-skin-primary"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
