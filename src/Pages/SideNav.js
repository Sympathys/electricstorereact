// src/Pages/ProductManagement/SideNav.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css'; // Ensure this is imported

const SideNav = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="side-nav bg-white border-r h-screen">
      <ul className="flex flex-col p-4">
        <li className={`mb-2 cursor-pointer nav-item ${location.pathname === '/ProductManagement' ? 'active' : ''}`}>
          <Link to="/ProductManagement">Quản lý sản phẩm</Link>
        </li>
        <li className={`mb-2 cursor-pointer nav-item ${location.pathname === '/ImportManagement' ? 'active' : ''}`}>
          <Link to="/ImportManagement">Quản lý nhập hàng</Link>
        </li>
        <li className={`mb-2 cursor-pointer nav-item ${location.pathname === '/ProviderManagement' ? 'active' : ''}`}>
          <Link to="/ProviderManagement">Quản lý nhà cung cấp</Link>
        </li>
        <li className={`mb-2 cursor-pointer nav-item ${location.pathname === '/warehouse-management' ? 'active' : ''}`}>
          <Link to="/warehouse-management">Quản lý kho</Link>
        </li>
        <li className={`mb-2 cursor-pointer nav-item ${location.pathname === '/invoice-management' ? 'active' : ''}`}>
          <Link to="/invoice-management">Quản lý hóa đơn</Link>
        </li>
        <li className={`mb-2 cursor-pointer nav-item ${location.pathname === '/customer-management' ? 'active' : ''}`}>
          <Link to="/customer-management">Quản lý khách hàng</Link>
        </li>
        <li className={`mb-2 cursor-pointer nav-item ${location.pathname === '/employee-management' ? 'active' : ''}`}>
          <Link to="/employee-management">Quản lý nhân viên</Link>
        </li>
        <li className={`mb-2 cursor-pointer nav-item ${location.pathname === '/account-management' ? 'active' : ''}`}>
          <Link to="/account-management">Quản lý tài khoản</Link>
        </li>
        <li className={`mb-2 cursor-pointer nav-item ${location.pathname === '/order-management' ? 'active' : ''}`}>
          <Link to="/order-management">Quản lý đơn hàng</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;