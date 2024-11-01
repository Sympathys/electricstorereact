import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clientAPI from "../../client-api/rest-client";
const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [productDetail, setProductDetail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
        try {
            const data = await clientAPI.service('product').get(id); // Gọi API để lấy chi tiết sản phẩm
            setProductDetail(data.data);
        } catch (error) {
            console.error("Failed to fetch product details", error);
        }
    };

    fetchProductDetail();
    }, [id]);

    const handleAddToCart = async () => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
          navigate('/login');
      } else {
          try {
              const response = await clientAPI.service('cart').create(
                {
                idProduct: productDetail.idProduct,
                quantity: 1,
                nameOfProduct: productDetail.nameOfProduct,
                price: productDetail.price,
                }
              );
              console.log("Thêm sản phẩm vào giỏ hàng thành công:", response.data);
          } catch (error) {
              console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
          }
      }
  };
  

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <img className="w-full h-64 object-cover object-center" src={productDetail.Image} alt={productDetail.Name} />
        <div className="mt-4">
          <h2 className="text-gray-900 text-2xl font-bold">{productDetail.nameOfProduct}</h2>
          <p className="text-red-500 text-xl font-semibold mt-2">{productDetail.price} ₫</p>
          <p className="text-gray-600 mt-1">Mã sản phẩm: {productDetail.idProduct}</p>
          <button 
            onClick={handleAddToCart}
            className="mt-4 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
          >
            Chọn mua
          </button>
          <div className="mt-4">
            <h3 className="text-gray-900 text-lg font-semibold">Thông tin sản phẩm</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Thương hiệu: {productDetail.Brand}</li>
              <li>Dung lượng: {productDetail.Capacity}</li>
              <li>Pin: {productDetail.Battery}</li>
              <li>Sạc nhanh: {productDetail.FastCharging}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
