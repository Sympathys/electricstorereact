import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Lắng nghe thay đổi đường dẫn

  useEffect(() => {
    // Lấy thông tin user từ localStorage và trích xuất username
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setUser({ username: storedUser.username });
    } else {
      setUser(null); // Đặt lại trạng thái user nếu không có
    }
  }, [location]); // Mỗi khi location thay đổi, header sẽ cập nhật lại

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    
    if (isConfirmed) {
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
        
        // Đặt lại trạng thái dropdown
        setIsDropdownOpen(false);
        
        navigate(`/LogIn`);
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  return (
    <header className="w-full bg-gray-100 border-b">
      <div className="flex items-center justify-between py-2 px-4 bg-white">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/50" alt="Logo" className="w-12 h-12" />
          <div className="ml-2">
            <span className="text-pink-500 text-lg font-bold">ONLINE E-STORE</span>
          </div>
        </div>

        <div className="flex items-center w-1/2">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Tìm kiếm sản phẩm trên shop..."
          />
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center cursor-pointer">
            <i className="fas fa-shopping-cart text-gray-600"></i>
            <span className="ml-1 text-gray-600">Giỏ hàng</span>
          </div>

          {user ? (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <i className="fas fa-user-circle text-gray-600"></i>
                <span className="ml-1 text-gray-600">{user.username}</span>
              </div>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <Link
                    to="/info"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Thông tin cá nhân
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Cài đặt
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center cursor-pointer">
              <i className="fas fa-user-circle text-gray-600"></i>
              <Link to="/LogIn" className="ml-1 text-gray-600">Tài Khoản</Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-pink-500 text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
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
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <i className="fas fa-envelope"></i>
              <span className="ml-2">hpn@gmail.com</span>
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
