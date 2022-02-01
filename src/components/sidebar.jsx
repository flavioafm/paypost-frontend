import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  useLocation
} from "react-router-dom";
import { MenuIcon } from "@heroicons/react/solid";
import useAuth from "../hooks/useAuth";

function Sidebar(props) {

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
    <div className="z-100 shadow-lg shadow-gray-500/50">

        <div className="bg-gray-200 text-gray-500 flex justify-between md:hidden">
            <img className="w-[100px] h-[22px] p-1 self-center" src="https://res.cloudinary.com/flavioafm/image/upload/v1643749511/paypost/eyerate_hnjp5k.png" alt="EyeRate"/>
            <button className="mobile-menu-button p-4 focus:outline-none hover:bg-gray-400" onClick={() => setOpened(!opened)}>
              <MenuIcon className="h-5 w-5"/>
            </button>
        </div>

        <div className={`sidebar h-full bg-gray-200 text-gray-500 w-54 space-y-6 py-7 px-2 absolute inset-y-0 z-20 shadow-lg shadow-blue-500/50
                         left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out ${extraSideBarClass}`}>
            <a href="/" className="text-white flex items-center space-x-2 px-4">
              <img className="w-[100px]" src="https://res.cloudinary.com/flavioafm/image/upload/v1643749511/paypost/eyerate_hnjp5k.png" alt="EyeRate"/>
            </a>
            <nav>
              <a href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
                  Home
              </a>
              <a href="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
                  Profile
              </a>
              <a href="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white" onClick={handleLogout}>
                  Logout
              </a>
            </nav>
        </div>
    </div>
  );
}

export default Sidebar;
