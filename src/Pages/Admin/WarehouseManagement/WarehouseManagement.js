import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav';
import WarehouseTable from './WarehouseTable';
import WarehouseForm from './WarehouseForm';
import clientAPI from '../../../client-api/rest-client';

const WarehouseManagement = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshWarehouses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientAPI.service('warehouse').find();
      setWarehouses(response.data);
      setSelectedWarehouse(null);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      setError('Unable to load warehouses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWarehouses();
  }, []);

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-grow p-4">
        {loading ? (
          <p>Loading warehouses...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <WarehouseTable warehouses={warehouses} onWarehouseSelect={setSelectedWarehouse} />
            <WarehouseForm selectedWarehouse={selectedWarehouse} onRefresh={refreshWarehouses} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WarehouseManagement;
