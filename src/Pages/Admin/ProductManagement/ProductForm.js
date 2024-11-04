import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Đảm bảo đường dẫn chính xác

const ProductForm = ({ selectedProduct, onRefresh }) => {
  const [product, setProduct] = useState({
    idProduct: '',
    nameOfProduct: '',
    quantity: 1,
    price: '',
    idTypeProduct: '',
    image: null,
    status: 'Available',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        idProduct: selectedProduct.idProduct,
        nameOfProduct: selectedProduct.nameOfProduct,
        quantity: selectedProduct.quantity || 1,
        price: selectedProduct.price,
        idTypeProduct: selectedProduct.idTypeProduct,
        image: selectedProduct.image,
        status: selectedProduct.status,
      });

      if (selectedProduct.image) {
        const formattedImagePath = `http://localhost:3000/${selectedProduct.image.replace(/\\/g, '/')}`;
        setImagePreview(formattedImagePath);
      } else {
        setImagePreview(null);
      }
    } else {
      resetForm();
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate that quantity and price are numbers
    const numericValue = name === 'quantity' || name === 'price' ? value.replace(/[^0-9.]/g, '') : value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: numericValue,
    }));
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.nameOfProduct || product.quantity <= 0 || !product.price || !product.idTypeProduct) {
      setError('Vui lòng điền đầy đủ thông tin sản phẩm!');
      return;
    }

    const formData = new FormData();
    formData.append('idProduct', product.idProduct);
    formData.append('nameOfProduct', product.nameOfProduct);
    formData.append('quantity', Number(product.quantity));
    formData.append('price', Number(product.price));
    formData.append('idTypeProduct', product.idTypeProduct);

    // Append the image only if it's a file
    if (product.image && product.image instanceof File) {
      formData.append('image', product.image);
    }

    formData.append('status', product.status);

    try {
      const response = selectedProduct
        ? await clientAPI.patch(product.idProduct, formData)
        : await clientAPI.create(formData);
      console.log('Sản phẩm đã được', selectedProduct ? 'cập nhật' : 'thêm', 'thành công:', response);
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Lỗi khi thêm/cập nhật sản phẩm:', error.response ? error.response.data : error.message);
      setError('Có lỗi xảy ra khi thêm/cập nhật sản phẩm!');
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      await clientAPI.remove(product.idProduct);
      console.log('Sản phẩm đã được xóa thành công');
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error.response ? error.response.data : error.message);
      setError('Có lỗi xảy ra khi xóa sản phẩm!');
    }
  };

  const resetForm = () => {
    setProduct({
      idProduct: '',
      nameOfProduct: '',
      quantity: 1,
      price: '',
      idTypeProduct: '',
      image: null,
      status: 'Available',
    });
    setImagePreview(null);
    setError('');
  };

  return (
    <div className="product-form p-4 bg-white border ml-4 h-full flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex-grow">
        <div className="mb-4">
          <label className="block mb-2">ID_SP</label>
          <input
            type="text"
            name="idProduct"
            value={product.idProduct}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
            disabled={!!selectedProduct} // Không cho nhập khi chọn sản phẩm
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tên sản phẩm</label>
          <input
            type="text"
            name="nameOfProduct"
            value={product.nameOfProduct}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Số lượng</label>
          <input
            type="text" // Change to text
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Giá</label>
          <input
            type="text" // Change to text
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Loại sản phẩm</label>
          <input
            type="text"
            name="idTypeProduct"
            value={product.idTypeProduct}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Trạng thái</label>
          <select name="status" value={product.status} onChange={handleChange} className="border py-2 px-3 w-full">
            <option value="Available">Còn hàng</option>
            <option value="Not Available">Hết hàng</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Hình ảnh</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="border py-2 px-3 w-full" />
          {imagePreview && <img src={imagePreview} alt="Hình ảnh xem trước" className="mt-2 w-32 h-32 object-cover" />}
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Thêm</button>
          <button type="button" onClick={handleSubmit} className={`bg-green-500 text-white px-4 py-2 rounded ${!selectedProduct ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedProduct}>Sửa</button>
          <button type="button" onClick={handleDelete} className={`bg-red-500 text-white px-4 py-2 rounded ${!selectedProduct ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedProduct}>Xóa</button>
          <button type="button" onClick={() => { resetForm(); onRefresh(); }} className="bg-blue-500 text-white px-4 py-2 rounded">Làm mới</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;