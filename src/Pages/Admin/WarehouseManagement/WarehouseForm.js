
import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Ensure the path is correct

const WarehouseForm = ({ selectedWarehouse, onRefresh }) => {
  const [warehouse, setWarehouse] = useState({
    idProduct: '',
    nameOfProduct: '',
    quantity: 0,
    price: 0,
    idProvider: '',
    nameOfProvider: '',
  });

  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');

  // Fetch providers on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await clientAPI.service('provider').find();
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setError('Error fetching providers, please try again later.');
      }
    };

    fetchProviders();

    if (selectedWarehouse) {
      setWarehouse(selectedWarehouse);
    } else {
      resetForm();
    }
  }, [selectedWarehouse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarehouse((prevWarehouse) => ({
      ...prevWarehouse,
      [name]: value,
    }));
    setError('');

    if (name === 'idProvider') {
      const selectedProvider = providers.find(provider => provider.idProvider === value);
      setWarehouse((prevWarehouse) => ({
        ...prevWarehouse,
        nameOfProvider: selectedProvider ? selectedProvider.nameOfProvider : '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!warehouse.idProduct || !warehouse.nameOfProduct || warehouse.quantity < 0 || warehouse.price < 0 || !warehouse.idProvider) {
      setError('Vui lòng điền đầy đủ thông tin kho!');
      return;
    }

    try {
      const response = selectedWarehouse
        ? await clientAPI.service('warehouse').update(selectedWarehouse.idProduct, warehouse)
        : await clientAPI.service('warehouse').create(warehouse);
      console.log('Kho đã được', selectedWarehouse ? 'cập nhật' : 'thêm', 'thành công:', response);
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Lỗi khi thêm/cập nhật kho:', error.response ? error.response.data : error.message);
      setError('Có lỗi xảy ra khi thêm/cập nhật kho!');
    }
  };

  const handleDelete = async () => {
    if (!selectedWarehouse) return;
    try {
      await clientAPI.service('warehouse').remove(selectedWarehouse.idProduct);
      console.log('Kho đã được xóa thành công');
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Lỗi khi xóa kho:', error.response ? error.response.data : error.message);
      setError('Có lỗi xảy ra khi xóa kho!');
    }
  };

  const resetForm = () => {
    setWarehouse({
      idProduct: '',
      nameOfProduct: '',
      quantity: 0,
      price: 0,
      idProvider: '',
      nameOfProvider: '',
    });
    setError('');
  };

  return (
    <div className="warehouse-form p-4 bg-white border ml-4 h-full flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex-grow">
        <div className="mb-4">
          <label className="block mb-2">ID Sản Phẩm</label>
          <input
            type="text"
            name="idProduct"
            value={warehouse.idProduct}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
            disabled={!!selectedWarehouse} // Prevent editing when selecting an existing warehouse
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tên Sản Phẩm</label>
          <input
            type="text"
            name="nameOfProduct"
            value={warehouse.nameOfProduct}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Số Lượng</label>
          <input
            type="number"
            name="quantity"
            value={warehouse.quantity}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Giá</label>
          <input
            type="number"
            name="price"
            value={warehouse.price}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nhà Cung Cấp</label>
          <select
            name="idProvider"
            value={warehouse.idProvider}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
            required
          >
            <option value="">Chọn Nhà Cung Cấp</option>
            {providers.map(provider => (
              <option key={provider.idProvider} value={provider.idProvider}>
                {provider.nameOfProvider}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tên Nhà Cung Cấp</label>
          <input
            type="text"
            name="nameOfProvider"
            value={warehouse.nameOfProvider}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
            disabled
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Thêm</button>
          <button type="button" onClick={handleSubmit} className={`bg-green-500 text-white px-4 py-2 rounded ${!selectedWarehouse ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedWarehouse}>Sửa</button>
          <button type="button" onClick={handleDelete} className={`bg-red-500 text-white px-4 py-2 rounded ${!selectedWarehouse ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedWarehouse}>Xóa</button>
          <button type="button" onClick={() => { resetForm(); onRefresh(); }} className="bg-blue-500 text-white px-4 py-2 rounded">Làm mới</button>
        </div>
      </form>
    </div>
  );
};

export default WarehouseForm;
