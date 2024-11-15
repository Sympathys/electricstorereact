import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav';
import ImportTable from './ImportTable';
import ImportForm from './ImportForm';
import clientAPI from '../../../client-api/rest-client';

const ImportManagement = () => {
  const [selectedImport, setSelectedImport] = useState(null);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshImports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientAPI.service('import').find();
      setImports(response.data);
      setSelectedImport(null);
    } catch (error) {
      console.error('Error fetching imports:', error);
      setError('Unable to load imports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshImports();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-200 h-full">
        <SideNav />
      </div>
      <div className="w-4/5 p-4 overflow-auto">
        {loading ? (
          <p>Loading imports...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <ImportTable imports={imports} onImportSelect={setSelectedImport} />
            <ImportForm selectedImport={selectedImport} onRefresh={refreshImports} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportManagement;
