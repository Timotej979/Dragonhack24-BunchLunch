import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter

const SideNavbar: React.FC = () => {
  const router = useRouter(); // Use the useRouter hook to get the current route information

  return (
    <nav className="w-64 h-fill sticky top-0 pt-20">
      <div className="p-4">
        <h1 className="text-white text-xl font-bold">Sidebar</h1>
      </div>
      <ul className="text-black">
        <li className="p-4">
          <Link href="/">
            <div className="inline-block">
              {/* Remove hover background color effect and keep zoom effect */}
              <img src={router.pathname === "/" ? "/icons/groupselected.svg" : "/icons/group.svg"} alt="Group Icon" className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </div>
          </Link>
        </li>
        <li className="p-4">
          <Link href="/about">
            <div className="inline-block">
              {/* Remove hover background color effect and keep zoom effect */}
              <img src={router.pathname === "/about" ? "/icons/orderselected.svg" : "/icons/order.svg"} alt="Order Icon" className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </div>
          </Link>
        </li>
        <li className="p-4">
          <Link href="/contact">
            <div className="inline-block">
              {/* Remove hover background color effect and keep zoom effect */}
              <img src={router.pathname === "/contact" ? "/icons/historyselected.svg" : "/icons/history.svg"} alt="History Icon" className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavbar;
