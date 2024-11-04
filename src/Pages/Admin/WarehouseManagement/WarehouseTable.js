
import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client';

const WarehouseTable = ({ warehouses, onWarehouseSelect }) => {
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameOfProduct'); // Default search by product name

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (warehouse) => {
    onWarehouseSelect(warehouse);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search controls */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search warehouses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border py-2 px-3 w-1/2"
        />
        <select onChange={(e) => setSearchBy(e.target.value)} value={searchBy} className="border py-2 px-3">
          <option value="nameOfProduct">Product Name</option>
          <option value="idProduct">Product ID</option>
          <option value="quantity">Quantity</option>
          <option value="price">Price</option>
        </select>
      </div>

      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID Product</th>
            <th className="py-2 px-4 border">Product Name</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Provider ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarehouses.length > 0 ? (
            filteredWarehouses.map((warehouse, index) => (
              <tr key={index} onClick={() => handleRowClick(warehouse)} className="cursor-pointer hover:bg-gray-100">
                <td className="py-2 px-4 border">{warehouse.idProduct}</td>
                <td className="py-2 px-4 border">{warehouse.nameOfProduct}</td>
                <td className="py-2 px-4 border">{warehouse.quantity}</td>
                <td className="py-2 px-4 border">{warehouse.price}</td>
                <td className="py-2 px-4 border">{warehouse.idProvider}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-2 px-4 border text-center">No warehouses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseTable;