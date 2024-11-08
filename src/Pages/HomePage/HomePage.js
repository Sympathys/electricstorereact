import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Sử dụng hook để điều hướng
import clientAPI from "../../client-api/rest-client";

const HomePage = () => {
  const [product, setProduct] = useState([]); // Khởi tạo với mảng rỗng
  const navigate = useNavigate(); // Hook điều hướng
  const loadForm = async () => {
    try {
        const data = await clientAPI.service('product').find(); // Gọi API để lấy tất cả sản phẩm

        if (Array.isArray(data.data)) {  // Kiểm tra xem data có phải là mảng không
            setProduct(data.data);         // Cập nhật sản phẩm nếu là mảng
        } else {
            console.error("Expected an array but got:", data.data);
        }
    } catch (error) {
        if (error.response && error.response.data) {
            window.alert(`Error: ${error.response.data.message}`);
        } else {
            window.alert("Error: Something went wrong");
        }
        console.log(error);
    }
};

  useEffect(() => {
    loadForm();
  }, []);
  const handleProductDetailClick = (id) => {
    console.log(id);
    navigate(`/product/${id}`); // Điều hướng tới trang chi tiết sản phẩm
  };
  const handleProductClick = (type) => {
    navigate(`/products/${type}`);
  };


  return (
    <div className="container mx-auto p-4">
      {/* Thanh danh mục sản phẩm */}
      <div className="flex">
        <div className="w-1/4">
          <h2 className="text-lg font-bold mb-4">DANH MỤC SẢN PHẨM</h2>
          <ul className="space-y-2">
            <li className="flex items-center hover:underline cursor-pointer" onClick={() => handleProductClick("Điện thoại")}>
              <i className="fas fa-mobile-alt"></i>
              <span className="ml-2">Điện thoại</span>
            </li>
            <li className="flex items-center hover:underline cursor-pointer" onClick={() => handleProductClick("Laptop")}>
              <i className="fas fa-laptop"></i>
              <span className="ml-2">Laptop</span>
            </li>
            <li className="flex items-center hover:underline cursor-pointer" onClick={() => handleProductClick("Camera")}>
              <i className="fas fa-camera"></i>
              <span className="ml-2">Camera</span>
            </li>
            <li className="flex items-center hover:underline cursor-pointer" onClick={() => handleProductClick("Máy tính bảng")}>
              <i className="fas fa-tablet-alt"></i>
              <span className="ml-2">Máy tính bảng</span>
            </li>
          </ul>

          <h2 className="text-lg font-bold mt-8 mb-4">KHÁC</h2>
          <ul className="space-y-2">
            <li>Hướng dẫn mua hàng</li>
            <li>Hướng dẫn thanh toán</li>
            <li>Tuyển dụng</li>
          </ul>
        </div>

        {/* Phần banner */}
        <div className="w-3/4 ml-4">
          <div className="mb-4">
            <img
              src="https://via.placeholder.com/800x200"
              alt="Banner"
              className="rounded-lg"
            />
          </div>

          {/* Phần danh sách sản phẩm */}
          <h2 className="text-lg font-bold mb-4">SẢN PHẨM</h2>
          <div className="grid grid-cols-4 gap-4">
            {product.length > 0 ? (
              product.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 shadow-md cursor-pointer"
                  onClick={() => handleProductDetailClick(item._id)} // Gọi sự kiện khi nhấn
                >
                  <img
                    src={item.Image || "https://via.placeholder.com/150"} // Thay thế bằng ảnh sản phẩm thực tế
                    alt={item.Name}
                    className="w-full mb-4"
                  />
                  <h3 className="text-lg font-semibold">{item.nameOfProduct}</h3>
                  <p className="text-red-500 font-bold">{item.price} đ</p>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm nào</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
