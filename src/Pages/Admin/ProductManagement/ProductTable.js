import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Nhập clientAPI

const ProductTable = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameOfProduct'); // Mặc định tìm kiếm theo tên sản phẩm

  const fetchProducts = async () => {
    try {
      const response = await clientAPI.service('product').find(); // Gọi phương thức 'find' để lấy sản phẩm
      setProducts(response.data); // Cập nhật danh sách sản phẩm
    } catch (error) {
      setError('Không thể lấy dữ liệu sản phẩm');
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleRowClick = (product) => {
    onProductSelect(product);
  };

  const filteredProducts = products.filter((product) =>
    product[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search controls */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearch}
          className="border py-2 px-3 w-1/2"
        />
        <select onChange={handleSearchByChange} value={searchBy} className="border py-2 px-3">
          <option value="nameOfProduct">Tên sản phẩm</option>
          <option value="typeProduct">Loại sản phẩm</option>
          <option value="price">Giá sản phẩm</option>
        </select>
      </div>

      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID_SP</th>
            <th className="py-2 px-4 border">Tên</th>
            <th className="py-2 px-4 border">Số lượng</th>
            <th className="py-2 px-4 border">Giá</th>
            <th className="py-2 px-4 border">Loại sản phẩm</th>
            <th className="py-2 px-4 border">Trạng thái</th>
            <th className="py-2 px-4 border">Mô tả</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={index} onClick={() => handleRowClick(product)} className="cursor-pointer hover:bg-gray-100">
                <td className="py-2 px-4 border">{product.idProduct}</td>
                <td className="py-2 px-4 border">{product.nameOfProduct}</td>
                <td className="py-2 px-4 border">{product.quantity}</td>
                <td className="py-2 px-4 border">{product.price}</td>
                <td className="py-2 px-4 border">{product.typeProduct}</td>
                <td className="py-2 px-4 border">{product.status === "Available" ? "Còn hàng" : "Hết hàng"}</td>
                <td className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap py-2 px-4 border">
                  {product.description}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-2 px-4 border text-center">Không có sản phẩm nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
