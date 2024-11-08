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

  // Fetch all imports
  const refreshImports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientAPI.service('import').find(); // Assuming you have an 'import' service
      setImports(response.data);
      setSelectedImport(null); // Clear selection on refresh
    } catch (error) {
      console.error('Error fetching imports:', error);
      setError('Unable to load imports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch imports on component mount
  useEffect(() => {
    refreshImports();
  }, []);

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-grow p-4">
        {loading ? (
          <p>Loading imports...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            {/* Import Table to list and select imports */}
            <ImportTable imports={imports} onImportSelect={setSelectedImport} />
            {/* Import Form to add or edit imports */}
            <ImportForm selectedImport={selectedImport} onRefresh={refreshImports} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportManagement;
