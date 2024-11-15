// src/Pages/ProductManagement/ProductManagement.js
import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import clientAPI from '../../../client-api/rest-client';

const ProductManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientAPI.service('product').find();
      setProducts(response.data);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Không thể lấy sản phẩm:', error);
      setError('Không thể tải sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Thu nhỏ thanh điều hướng bên trái */}
      <div className="w-1/6 bg-gray-200 h-full">
        <SideNav />
      </div>
      <div className="w-5/6 p-4 overflow-auto">
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <ProductTable products={products} onProductSelect={setSelectedProduct} />
            <ProductForm selectedProduct={selectedProduct} onRefresh={refreshProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
