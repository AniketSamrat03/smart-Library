import React from 'react';
import { NavLink } from 'react-router-dom';
import FunctionBtn from '../FunctionBtn';
import { UserSidebarData, AdminSidebarData } from './sideBarData';

function SideBar({ isSidebarOpen, setIsSidebarOpen }) {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderMenuItems = (menuData) => {
    return menuData.map((item, index) => (
      <li key={index} className="p-1.5">
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md transition text-[#67C090] ${
              isActive
                ? 'bg-[#26667F] text-white'
                : 'hover:bg-[#26667F] hover:text-white'
            }`
          }
        >
          {/* Icon container with fixed width */}
          <div className="w-6 flex-shrink-0">{item.icon}</div>

          {/* Show title only if sidebar is open */}
          {isSidebarOpen && <span className="ml-2">{item.title}</span>}
        </NavLink>
      </li>
    ));
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#124170] shadow-lg p-4 z-50 transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between bg-[#26667F] rounded-md">
        <FunctionBtn
          className="bg-transparent border-none flex items-center p-1"
          onClick={toggleSidebar}
        >
          <span
            className={`block transition-transform duration-300 ${
              isSidebarOpen ? 'rotate-0' : 'rotate-180'
            }`}
          >
            ▶
          </span>
        </FunctionBtn>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8">
        <ul className="mt-3.5">
          {renderMenuItems(UserSidebarData)}
          {renderMenuItems(AdminSidebarData)}
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;





