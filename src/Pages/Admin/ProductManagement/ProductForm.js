import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Ensure the path is correct

const ProductForm = ({ selectedProduct, onRefresh }) => {
  const [product, setProduct] = useState({
    idProduct: '',
    nameOfProduct: '',
    quantity: 1,
    price: '',
    typeProduct: '',
    image: null,
    status: 'Available',
    description: '',
  });

  const [warehouses, setWarehouses] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Fetch warehouse data
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await clientAPI.service('warehouse').find();
        setWarehouses(response.data);
      } catch (error) {
        console.error('Error fetching warehouse data:', error);
        setError('Error fetching warehouse data');
      }
    };

    fetchWarehouses();

    if (selectedProduct) {
      setProduct({
        idProduct: selectedProduct.idProduct || '',
        nameOfProduct: selectedProduct.nameOfProduct || '',
        quantity: selectedProduct.quantity || 1,
        price: selectedProduct.price || '',
        typeProduct: selectedProduct.typeProduct || '',
        image: selectedProduct.image || null,
        status: selectedProduct.status || 'Available',
        description: selectedProduct.description || '',
      });
      setImagePreview(selectedProduct.image ? `http://localhost:3000/${selectedProduct.image.replace(/\\/g, '/')}` : null);
    } else {
      resetForm();
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setError('');
  };

  const handleProductChange = (e) => {
    const selectedId = e.target.value;
    const selectedWarehouse = warehouses.find((item) => item.idProduct === selectedId);
    if (selectedWarehouse) {
      setProduct({
        idProduct: selectedWarehouse.idProduct || '',
        nameOfProduct: selectedWarehouse.nameOfProduct || '',
        quantity: selectedWarehouse.quantity || 0,
        price: selectedWarehouse.price || '',
        typeProduct: selectedWarehouse.typeProduct || '',
        image: selectedWarehouse.image || null,
        status: selectedWarehouse.status || 'Available',
        description: selectedWarehouse.description || '',
      });
      setImagePreview(selectedWarehouse.image ? `http://localhost:3000/${selectedWarehouse.image.replace(/\\/g, '/')}` : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.nameOfProduct || product.quantity <= 0 || !product.price || !product.typeProduct) {
      setError('Vui lòng điền đầy đủ thông tin sản phẩm!');
      return;
    }
  
    const formData = new FormData();
    formData.append('idProduct', product.idProduct);
    formData.append('nameOfProduct', product.nameOfProduct);
    formData.append('quantity', product.quantity);
    formData.append('price', product.price);
    formData.append('typeProduct', product.typeProduct);
    formData.append('description', product.description);
    if (product.image && product.image instanceof File) {
      formData.append('image', product.image);
    } else if (!product.image) { // Kiểm tra nếu không có hình ảnh
      formData.append('image', ''); // Gửi chuỗi rỗng thay vì null hoặc object
    }
    formData.append('status', product.status);
  
    try {
      const response = selectedProduct
        ? await clientAPI.service('product').patch(selectedProduct.idProduct, formData)
        : await clientAPI.service('product').create(formData);
      console.log('Kho đã được', selectedProduct ? 'cập nhật' : 'thêm', 'thành công:', response);
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Lỗi khi thêm/cập nhật kho:', error.response ? error.response.data : error.message);
      setError('Có lỗi xảy ra khi thêm/cập nhật kho!');
    }
  };
  

  const resetForm = () => {
    setProduct({
      idProduct: '',
      nameOfProduct: '',
      quantity: 1,
      price: '',
      typeProduct: '',
      image: null,
      status: 'Available',
      description: '',
    });
    setImagePreview(null);
    setError('');
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      await clientAPI.service('product').remove(product.idProduct);
      console.log('Sản phẩm đã được xóa thành công');
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error.response ? error.response.data : error.message);
      setError('Có lỗi xảy ra khi xóa sản phẩm!');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="product-form p-4 bg-white border ml-4 h-full flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex-grow">
        <div className="mb-4">
          <label className="block mb-2">ID SP</label>
          <select
            name="idProduct"
            value={product.idProduct || ''}
            onChange={handleProductChange}
            className="border py-2 px-3 w-full"
          >
            <option value="">Chọn sản phẩm</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.idProduct} value={warehouse.idProduct}>
                {warehouse.idProduct} - {warehouse.nameOfProduct} ({warehouse.quantity} còn)
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tên sản phẩm</label>
          <input
            type="text"
            name="nameOfProduct"
            value={product.nameOfProduct || ''}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Số lượng</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity || 0}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Giá</label>
          <input
            type="text"
            name="price"
            value={product.price || ''}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Loại sản phẩm</label>
          <input
            type="text"
            name="typeProduct"
            value={product.typeProduct || ''}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mô tả sản phẩm</label>
          <textarea
            name="description"
            value={product.description || ''}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Trạng thái</label>
          <select
            name="status"
            value={product.status || 'Available'}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          >
            <option value="Available">Còn hàng</option>
            <option value="Not Available">Hết hàng</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Hình ảnh</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="border py-2 px-3 w-full" />
          {imagePreview && <img src={imagePreview} alt="Hình ảnh xem trước" className="mt-2 w-32 h-32 object-cover" />}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Thêm
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`bg-green-500 text-white px-4 py-2 rounded ${!product.idProduct ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!product.idProduct}
          >
            Sửa
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Đặt lại
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Xóa
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
