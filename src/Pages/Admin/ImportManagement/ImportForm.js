import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Ensure correct path

const ImportForm = ({ selectedImport, onRefresh }) => {
  const [importData, setImportData] = useState({
    idProduct: '',
    nameOfProduct: '',
    quantity: 0,
    priceImport: 0,
    idProvider: '',
    nameOfProvider: '' // Added to store the provider name
  });

  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');

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

    if (selectedImport) {
      setImportData(selectedImport);
    } else {
      resetForm();
    }
  }, [selectedImport]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'idProvider') {
      const selectedProvider = providers.find(provider => provider.idProvider === value);
      setImportData(prevData => ({
        ...prevData,
        idProvider: value,
        nameOfProvider: selectedProvider ? selectedProvider.nameOfProvider : '' // Update nameOfProvider based on selected idProvider
      }));
    } else {
      setImportData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!importData.idProduct || !importData.nameOfProduct || importData.quantity < 0 || importData.priceImport < 0 || !importData.idProvider) {
      setError('Please fill in all required fields!');
      return;
    }

    try {
      let response;
      if (selectedImport) {
        response = await clientAPI.service('import').patch(selectedImport.idImport, importData);
        console.log('Import updated successfully:', response);
      } else {
        response = await clientAPI.service('import').create(importData);
        console.log('New import created successfully:', response);
      }
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error adding/updating import:', error.response ? error.response.data : error.message);
      setError('An error occurred while adding/updating the import!');
    }
  };

  const handleDelete = async () => {
    if (!selectedImport) return;
    try {
      await clientAPI.service('import').remove(selectedImport.idImport);
      console.log('Import deleted successfully');
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting import:', error.response ? error.response.data : error.message);
      setError('An error occurred while deleting the import!');
    }
  };

  const resetForm = () => {
    setImportData({
      idProduct: '',
      nameOfProduct: '',
      quantity: 0,
      priceImport: 0,
      idProvider: '',
      nameOfProvider: ''
    });
    setError('');
  };

  return (
    <div className="import-form p-4 bg-white border ml-4 h-full flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex-grow">
        <div className="mb-4">
          <label className="block mb-2">ID Sản Phẩm</label>
          <input type="text" name="idProduct" value={importData.idProduct} onChange={handleChange} className="border py-2 px-3 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tên Sản Phẩm</label>
          <input type="text" name="nameOfProduct" value={importData.nameOfProduct} onChange={handleChange} className="border py-2 px-3 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Số Lượng</label>
          <input type="number" name="quantity" value={importData.quantity} onChange={handleChange} className="border py-2 px-3 w-full" min="0" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Giá Nhập Khẩu</label>
          <input type="number" name="priceImport" value={importData.priceImport} onChange={handleChange} className="border py-2 px-3 w-full" min="0" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nhà Cung Cấp</label>
          <select name="idProvider" value={importData.idProvider} onChange={handleChange} className="border py-2 px-3 w-full" required>
            <option value="">Chọn Nhà Cung Cấp</option>
            {providers.map(provider => (
              <option key={provider.idProvider} value={provider.idProvider}>
                {provider.idProvider}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tên Nhà Cung Cấp</label>
          <input type="text" name="nameOfProvider" value={importData.nameOfProvider} className="border py-2 px-3 w-full" disabled />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Thêm</button>
          <button type="button" onClick={handleSubmit} className={`bg-green-500 text-white px-4 py-2 rounded ${!selectedImport ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedImport}>Sửa</button>
          <button type="button" onClick={handleDelete} className={`bg-red-500 text-white px-4 py-2 rounded ${!selectedImport ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!selectedImport}>Xóa</button>
          <button type="button" onClick={() => { resetForm(); if (onRefresh) onRefresh(); }} className="bg-blue-500 text-white px-4 py-2 rounded">Làm mới</button>
        </div>
      </form>
    </div>
  );
};

export default ImportForm;
