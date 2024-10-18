import React from 'react';

const ProductDetail = () => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <img className="w-full h-64 object-cover object-center" src="path_to_image" alt="iPhone 13 Pro Max" />
        <div className="mt-4">
          <h2 className="text-gray-900 text-2xl font-bold">Iphone 13 promax chính hãng</h2>
          <p className="text-red-500 text-xl font-semibold mt-2">22.990.000 ₫</p>
          <p className="text-gray-600 mt-1">Mã sản phẩm: 123</p>
          <button className="mt-4 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">Chọn mua</button>
          <div className="mt-4">
            <h3 className="text-gray-900 text-lg font-semibold">Thông tin sản phẩm</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Thương hiệu: Iphone</li>
              <li>Dung lượng: 128 GB</li>
              <li>Pin: 4500 mAh</li>
              <li>Sạc nhanh: ...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
