import React from 'react';
import Link from 'next/link';

const SideNavbar: React.FC = () => {
  return (
    <nav className="w-64 h-full fixed top-0 left-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-white text-xl font-bold">Sidebar</h1>
      </div>
      <ul className="text-black">
        <li className="p-4">
          <Link href="/">
            <div className="inline-block hover:bg-gray-700">
              <img src="/icons/group.svg" alt="Group Icon" className="w-6 h-6" />
            </div>
          </Link>
        </li>
        <li className="p-4">
          <Link href="/about">
            <div className="inline-block hover:bg-gray-700">
              <img src="/icons/order.svg" alt="Order Icon" className="w-6 h-6" />
            </div>
          </Link>
        </li>
        <li className="p-4">
          <Link href="/contact">
            <div className="inline-block hover:bg-gray-700">
              <img src="/icons/history.svg" alt="History Icon" className="w-6 h-6" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavbar;
