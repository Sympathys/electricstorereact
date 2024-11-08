import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Use clientAPI for consistent API calls

const ProviderTable = ({ onProviderSelect }) => {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameOfProvider'); // Default search by provider name

  // Fetch providers from the API
  const fetchProviders = async () => {
    try {
      const response = await clientAPI.service('provider').find(); // Call 'find' method to get providers
      setProviders(response.data); // Update provider list
    } catch (error) {
      setError('Không thể lấy dữ liệu nhà cung cấp');
      console.error("Error fetching providers:", error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search criteria change
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  // Handle row click
  const handleRowClick = (provider) => {
    onProviderSelect(provider);
  };

  // Filter providers based on search criteria
  const filteredProviders = providers.filter((provider) =>
    provider[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search controls */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Tìm kiếm nhà cung cấp..."
          value={searchTerm}
          onChange={handleSearch}
          className="border py-2 px-3 w-1/2"
        />
        <select onChange={handleSearchByChange} value={searchBy} className="border py-2 px-3">
          <option value="nameOfProvider">Tên nhà cung cấp</option>
          <option value="phone">Số điện thoại</option>
          <option value="address">Địa chỉ</option>
          <option value="gmail">Gmail</option>
        </select>
      </div>

      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID_NCC</th>
            <th className="py-2 px-4 border">Tên NCC</th>
            <th className="py-2 px-4 border">Số điện thoại</th>
            <th className="py-2 px-4 border">Địa chỉ</th>
            <th className="py-2 px-4 border">Gmail</th>
          </tr>
        </thead>
        <tbody>
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <tr key={provider.idProvider} onClick={() => handleRowClick(provider)} className="cursor-pointer hover:bg-gray-100">
                <td className="py-2 px-4 border">{provider.idProvider}</td>
                <td className="py-2 px-4 border">{provider.nameOfProvider}</td>
                <td className="py-2 px-4 border">{provider.phone}</td>
                <td className="py-2 px-4 border">{provider.address}</td>
                <td className="py-2 px-4 border">{provider.gmail}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-2 px-4 border text-center">Không có nhà cung cấp nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderTable;
