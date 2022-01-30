import React, { useEffect, useState } from 'react';
import {
  Link,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";
import { MenuIcon } from "@heroicons/react/solid";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import useAuth from "../hooks/useAuth";

function Sidebar() {

  const [ opened, setOpened ] = useState(false);
  const [ extraSideBarClass, setExtraSideBatClass ] = useState('')
  const navigate = useNavigate();
  const { state } = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    if (opened) {
      setExtraSideBatClass('-translate-x-full')
    } else {
      setExtraSideBatClass('')
    }
  }, [opened]);
  
  const handleLogout = async () => {
		await logout();
		navigate(state?.path || "/");
	};

  return (
    <div className="z-100">

        <div className="bg-blue-800 text-gray-100 flex justify-between md:hidden">
            <a href="#" className="block p-4 text-white font-bold">Better Dev</a>
            <button className="mobile-menu-button p-4 focus:outline-none focus:bg-blue-700" onClick={() => setOpened(!opened)}>
              <MenuIcon className="h-5 w-5"/>
            </button>
        </div>

        <div className={`sidebar h-full bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 z-20
                         left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out ${extraSideBarClass}`}>
            <a href="#" className="text-white flex items-center space-x-2 px-4">
              <BadgeCheckIcon className="w-8 h-8"/>
              <span className="text-2xl font-extrabold">Better Dev</span>
            </a>
            <nav>
              <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                  Home
              </a>
              <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                  About
              </a>
              <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                  Features
              </a>
              <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                  Pricing
              </a>
              <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white" onClick={handleLogout}>
                  Logout
              </a>
            </nav>
        </div>
    </div>
  );
}

export default Sidebar;
