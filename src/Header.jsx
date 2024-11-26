import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clientAPI from "./client-api/rest-client";

const Header = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.data) {
      setUser({ username: storedUser.data.username, role: storedUser.data.role });
    } else {
      setUser(null);
    }
  }, [location]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await clientAPI.service("product").find();
        setProducts(response);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm && Array.isArray(products.data)) {
      const results = products.data.filter((product) =>
        product.nameOfProduct.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredProducts([]);
    }
  };

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (isConfirmed) {
      try {
        const data = await clientAPI.service("services/sign-out").create();
        localStorage.removeItem("user");
        localStorage.removeItem("userToken");
        
        navigate(`/LogIn`);
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  const handleCartClick = () => {
    navigate("/CartPage");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="w-full bg-gray-100 border-b">
      <div className="flex items-center justify-between py-2 px-4 bg-white">
        <div>
          <Link to="/HomePage" className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Logo"
              className="w-12 h-12"
            />
            <div className="ml-2">
              <span className="text-pink-500 text-lg font-bold">
                ONLINE E-STORE
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center w-1/2 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Tìm kiếm sản phẩm trên shop..."
          />
          {filteredProducts.length > 0 && (
            <ul className="absolute top-10 left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(""); // Xóa nội dung ô tìm kiếm
                    setFilteredProducts([]); // Xóa danh sách gợi ý
                    navigate(`/product/${product._id}`); // Điều hướng đến trang sản phẩm
                  }}
                >
                  {product.nameOfProduct}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleCartClick}
          >
            <i className="fas fa-shopping-cart text-gray-600"></i>
            <span className="ml-1 text-gray-600">Giỏ hàng</span>
          </div>

          {user ? (
            <div ref={dropdownRef} className="relative">
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
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Thông tin cá nhân
                  </Link>
                  <Link
                    to="/orders-page"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Xem đơn đặt hàng
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Cài đặt
                  </Link>
                  <Link
                    to="/ChangePassword"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Đổi mật khẩu
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      to="/nav"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Trang quản lý Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
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
              <Link to="/LogIn" className="ml-1 text-gray-600">
                Tài Khoản
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-pink-500 text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <nav className="flex space-x-6"></nav>
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
