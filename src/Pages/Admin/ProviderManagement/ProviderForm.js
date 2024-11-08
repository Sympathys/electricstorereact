import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Đảm bảo đường dẫn chính xác

const ProviderForm = ({ selectedProvider, onRefresh }) => {
  const [provider, setProvider] = useState({
    idProvider: '',
    nameOfProvider: '',
    phone: '',
    address: '',
    gmail: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedProvider) {
      setProvider({
        idProvider: selectedProvider.idProvider,
        nameOfProvider: selectedProvider.nameOfProvider,
        phone: selectedProvider.phone,
        address: selectedProvider.address,
        gmail: selectedProvider.gmail,
      });
    } else {
      resetForm();
    }
  }, [selectedProvider]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProvider((prevProvider) => ({
      ...prevProvider,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!provider.idProvider || !provider.nameOfProvider || !provider.phone) {
      setError('Vui lòng điền đầy đủ thông tin nhà cung cấp!');
      return;
    }

    try {
      const response = selectedProvider
        ? await clientAPI.patch(provider.idProvider, provider)
        : await clientAPI.create(provider);
      console.log('Nhà cung cấp đã được', selectedProvider ? 'cập nhật' : 'thêm', 'thành công:', response);
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Lỗi khi thêm/cập nhật nhà cung cấp:', error.response ? error.response.data : error.message);
      setError('Có lỗi xảy ra khi thêm/cập nhật nhà cung cấp!');
    }
};


  const handleDelete = async () => {
    if (!selectedProvider) return;
    try {
      await clientAPI.remove(provider.idProvider);
      console.log('Nhà cung cấp đã được xóa thành công');
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Lỗi khi xóa nhà cung cấp:', error.response ? error.response.data : error.message);
      setError('Có lỗi xảy ra khi xóa nhà cung cấp!');
    }
  };

  const resetForm = () => {
    setProvider({
      idProvider: '',
      nameOfProvider: '',
      phone: '',
      address: '',
      gmail: '',
    });
    setError('');
  };

  return (
    <div className="provider-form p-4 bg-white border ml-4 h-full flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex-grow">
        <div className="mb-4">
          <label className="block mb-2">ID Nhà Cung Cấp</label>
          <input
            type="text"
            name="idProvider"
            value={provider.idProvider}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
            disabled={!!selectedProvider} // Không cho nhập khi chọn nhà cung cấp
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tên Nhà Cung Cấp</label>
          <input
            type="text"
            name="nameOfProvider"
            value={provider.nameOfProvider}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Số Điện Thoại</label>
          <input
            type="text"
            name="phone"
            value={provider.phone}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Địa Chỉ</label>
          <input
            type="text"
            name="address"
            value={provider.address}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Gmail</label>
          <input
            type="email"
            name="gmail"
            value={provider.gmail}
            onChange={handleChange}
            className="border py-2 px-3 w-full"
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Thêm</button>
          <button type="button" onClick={handleSubmit} className={`bg-green-500 text-white px-4 py-2 rounded ${!selectedProvider ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedProvider}>Sửa</button>
          <button type="button" onClick={handleDelete} className={`bg-red-500 text-white px-4 py-2 rounded ${!selectedProvider ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedProvider}>Xóa</button>
          <button type="button" onClick={() => { resetForm(); onRefresh(); }} className="bg-blue-500 text-white px-4 py-2 rounded">Làm mới</button>
        </div>
      </form>
    </div>
  );
};

export default ProviderForm;
