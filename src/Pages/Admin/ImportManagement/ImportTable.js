import React, { useState } from 'react';

const ImportTable = ({ imports, onImportSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameOfProduct'); // Default search by product name

  const filteredImports = imports.filter((importItem) =>
    importItem[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (importItem) => {
    onImportSelect(importItem);
  };

  return (
    <div>
      {/* Search controls */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search imports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border py-2 px-3 w-1/2"
        />
        <select onChange={(e) => setSearchBy(e.target.value)} value={searchBy} className="border py-2 px-3">
          <option value="nameOfProduct">Product Name</option>
          <option value="idProduct">Product ID</option>
          <option value="idImport">Import ID</option>
          <option value="quantity">Quantity</option>
          <option value="priceImport">Import Price</option>
          <option value="idProvider">Provider ID</option>
        </select>
      </div>

      {/* Display message when no data is found */}
      {filteredImports.length === 0 && (
        <div className="text-center text-red-500 mb-4">No imports found for the search criteria.</div>
      )}

      {/* Table displaying filtered imports */}
      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Import ID</th>
            <th className="py-2 px-4 border">Product ID</th>
            <th className="py-2 px-4 border">Product Name</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Import Price</th>
            <th className="py-2 px-4 border">Provider ID</th>
            <th className="py-2 px-4 border">Import Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredImports.length > 0 ? (
            filteredImports.map((importItem, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(importItem)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="py-2 px-4 border">{importItem.idImport}</td>
                <td className="py-2 px-4 border">{importItem.idProduct}</td>
                <td className="py-2 px-4 border">{importItem.nameOfProduct}</td>
                <td className="py-2 px-4 border">{importItem.quantity}</td>
                <td className="py-2 px-4 border">{importItem.priceImport}</td>
                <td className="py-2 px-4 border">{importItem.idProvider}</td>
                <td className="py-2 px-4 border">
                  {importItem.dateImport ? new Date(importItem.dateImport).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-2 px-4 border text-center">No imports found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ImportTable;
