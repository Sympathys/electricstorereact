import React from "react";

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Thanh danh mục sản phẩm */}
      <div className="flex">
        <div className="w-1/4">
          <h2 className="text-lg font-bold mb-4">DANH MỤC SẢN PHẨM</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <i className="fas fa-mobile-alt"></i>
              <span className="ml-2">Điện thoại</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-laptop"></i>
              <span className="ml-2">Laptop</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-camera"></i>
              <span className="ml-2">Camera</span>
            </li>
            <li className="flex items-center">
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
            {/* Sản phẩm 1 */}
            <div className="border rounded-lg p-4 shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Iphone 13 promax"
                className="w-full mb-4"
              />
              <h3 className="text-lg font-semibold">Iphone 13 promax</h3>
              <p className="text-red-500 font-bold">22.990.000 đ</p>
            </div>

            {/* Sản phẩm 2 */}
            <div className="border rounded-lg p-4 shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Xiaomi 14T"
                className="w-full mb-4"
              />
              <h3 className="text-lg font-semibold">Xiaomi 14T</h3>
              <p className="text-red-500 font-bold">13.990.000 đ</p>
            </div>

            {/* Sản phẩm 3 */}
            <div className="border rounded-lg p-4 shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Laptop Dell Inspiron 15"
                className="w-full mb-4"
              />
              <h3 className="text-lg font-semibold">
                Laptop Dell Inspiron 15
              </h3>
              <p className="text-red-500 font-bold">16.490.000 đ</p>
            </div>

            {/* Sản phẩm 4 */}
            <div className="border rounded-lg p-4 shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Xiaomi Pad 6S Pro"
                className="w-full mb-4"
              />
              <h3 className="text-lg font-semibold">Xiaomi Pad 6S Pro</h3>
              <p className="text-red-500 font-bold">13.990.000 đ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
