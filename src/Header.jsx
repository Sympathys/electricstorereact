import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-gray-100 border-b">
      {/* Phần trên của header chứa logo, thanh tìm kiếm, và các icon */}
      <div className="flex items-center justify-between py-2 px-4 bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Logo"
            className="w-12 h-12"
          />
          <div className="ml-2">
            <span className="text-pink-500 text-lg font-bold">Shop</span>
            <span className="text-gray-600 text-sm">Điện tử</span>
          </div>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex items-center w-1/2">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Tìm kiếm sản phẩm trên shop..."
          />
        </div>

        {/* Giỏ hàng và tài khoản */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center cursor-pointer">
            <i className="fas fa-shopping-cart text-gray-600"></i>
            <span className="ml-1 text-gray-600">Giỏ hàng</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <i className="fas fa-user-circle text-gray-600"></i>
            <Link to="/LogIn"className="ml-1 text-gray-600">Tài Khoản</Link>

          </div>
        </div>
      </div>

      {/* Phần dưới của header chứa các liên kết và thông tin liên hệ */}
      <div className="bg-pink-500 text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Liên kết trang */}
          <nav className="flex space-x-6">
            <Link to="/HomePage" className="hover:underline">
              Trang chủ
            </Link>
            <a href="#" className="hover:underline">
              Sản phẩm
            </a>
            <a href="#" className="hover:underline">
              Giới thiệu
            </a>
          </nav>

          {/* Thông tin liên hệ */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <i className="fas fa-envelope"></i>
              <span className="ml-2">hpn@gmail.com</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone"></i>
              <span className="ml-2">0123 432 231</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone"></i>
              <span className="ml-2">0123 432 231</span>
            </div>
            <div className="cursor-pointer hover:underline">Liên hệ</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
