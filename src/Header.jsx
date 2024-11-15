import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clientAPI from "./client-api/rest-client";

const Header = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State cho input tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState([]); // State cho sản phẩm đã lọc
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State quản lý hiển thị dropdown
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const navigate = useNavigate();
  const location = useLocation(); // Theo dõi thay đổi location để cập nhật thông tin người dùng

  // Lấy thông tin người dùng từ localStorage khi component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.data) {
      setUser({ username: storedUser.data.username });
    } else {
      setUser(null);
    }
  }, [location]);

  // Lấy dữ liệu sản phẩm từ clientAPI khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await clientAPI.service("product").find(); // Gọi API để lấy tất cả sản phẩm
        setProducts(response); // Giả sử dữ liệu trả về là mảng các sản phẩm
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts(); // Gọi API để lấy sản phẩm
  }, []); // Chỉ gọi khi component mount

  // Lọc sản phẩm khi thay đổi search term hoặc danh sách sản phẩm
  useEffect(() => {
    if (searchTerm && Array.isArray(products.data)) {
      const results = products.data.filter((product) =>
        product.nameOfProduct.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]); // Nếu không có từ khóa tìm kiếm thì không hiển thị kết quả
    }
  }, [searchTerm, products]);

  // Xử lý thay đổi input tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (isConfirmed) {
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("userToken");
        navigate(`/LogIn`);
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  // Xử lý sự kiện nhấn vào giỏ hàng
  const handleCartClick = () => {
    navigate("/CartPage");
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown
  };

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
                    setSearchTerm(product.nameOfProduct); // Đặt tên sản phẩm vào thanh tìm kiếm
                    setFilteredProducts([]); // Ẩn danh sách gợi ý
                    navigate(`/product/${product._id}`); // Điều hướng đến trang chi tiết sản phẩm
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
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown} // Toggle dropdown khi nhấn vào
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
                    to="/orders-page"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Xem đơn đặt hàng
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Cài đặt
                  </Link>
                  <Link
                    to="/ChangePassword"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Đổi mật khẩu
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
              <Link to="/LogIn" className="ml-1 text-gray-600">
                Tài Khoản
              </Link>
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
