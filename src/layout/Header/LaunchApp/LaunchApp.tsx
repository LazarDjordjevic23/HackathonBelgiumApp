import React from 'react';
import clsx from 'clsx';

export default function LaunchApp() {
  return (
    <div
      id="launch-app-btn"
      className="flex gap-2 px-4 py-2 rounded-md hover:scale-110 transition-transform cursor-pointer"
      style={{
        background:
          'linear-gradient(to bottom right , #8B2D9C, #E6464E,#FB6824,#F2A901)',
      }}
    >
      {/* <img src="/svg/rocket.svg" alt="launch" width={22} height={22} /> */}
      <span className={clsx('text-sm hidden lg:flex poppins')}>Launch App</span>
    </div>
  );
}
