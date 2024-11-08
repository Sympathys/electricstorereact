// src/Pages/ProductManagement/SideNav.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
  const location = useLocation();

  const routes = [
    { path: '/ProductManagement', label: 'Quản lý sản phẩm' },
    { path: '/ImportManagement', label: 'Quản lý nhập hàng' },
    { path: '/ProviderManagement', label: 'Quản lý nhà cung cấp' },
    { path: '/WarehouseManagement', label: 'Quản lý kho' },
    { path: '/OrderManagement', label: 'Quản lý hóa đơn' },
    { path: '/customer-management', label: 'Quản lý khách hàng' },
    { path: '/employee-management', label: 'Quản lý nhân viên' },
    { path: '/account-management', label: 'Quản lý tài khoản' },
    { path: '/order-management', label: 'Quản lý đơn hàng' },
  ];

  return (
    <div className="bg-white border-r h-screen shadow-md">
      <ul className="flex flex-col p-4">
        {routes.map(route => (
          <li
            key={route.path}
            className={`mb-2 p-3 cursor-pointer rounded-md transition-colors duration-300 ${
              location.pathname === route.path
                ? 'bg-pink-500 text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            <Link to={route.path} className="no-underline text-inherit">
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
