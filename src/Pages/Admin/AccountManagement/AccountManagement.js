import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav';
import AccountTable from './AccountTable'; // Make sure this component exists
import AccountForm from './AccountForm';
import clientAPI from '../../../client-api/rest-client';

const AccountManagement = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientAPI.service('account').find();
      setAccounts(response.data);
      setSelectedAccount(null);
    } catch (error) {
      console.error('Unable to fetch accounts:', error);
      setError('Unable to load accounts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAccounts();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-200 h-full">
        <SideNav />
      </div>
      <div className="w-4/5 p-4 overflow-auto">
        {loading ? (
          <p>Loading accounts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <AccountTable accounts={accounts} onAccountSelect={setSelectedAccount} />
            <AccountForm selectedAccount={selectedAccount} onRefresh={refreshAccounts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
