import React from 'react';
import { Link } from 'react-router-dom';

const loadHome = () => import('@/pages/Home/Home');
const loadAbout = () => import('@/pages/About/About');

export default function NavBar() {
  return (
    <div className="flex gap-3">
      <Link
        onMouseEnter={loadHome}
        className="text-skin-primary hover:text-skin-primary-hover"
        to="/"
      >
        home
      </Link>
      <Link
        onMouseEnter={loadAbout}
        className="text-skin-primary hover:text-skin-primary-hover"
        to="/about"
      >
        about
      </Link>
      <Link
        className="text-skin-primary hover:text-skin-primary-hover"
        to="/test"
      >
        test
      </Link>
    </div>
  );
}
