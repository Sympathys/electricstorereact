// src/Pages/ProviderManagement/ProviderManagement.js
import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav';
import ProviderTable from './ProviderTable'; // Ensure this component exists
import ProviderForm from './ProviderForm';
import clientAPI from '../../../client-api/rest-client';

const ProviderManagement = () => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientAPI.service('provider').find();
      setProviders(response.data);
      setSelectedProvider(null);
    } catch (error) {
      console.error('Không thể lấy nhà cung cấp:', error);
      setError('Không thể tải nhà cung cấp. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProviders();
  }, []);

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-grow p-4">
        {loading ? (
          <p>Đang tải nhà cung cấp...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <ProviderTable providers={providers} onProviderSelect={setSelectedProvider} />
            <ProviderForm selectedProvider={selectedProvider} onRefresh={refreshProviders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderManagement;