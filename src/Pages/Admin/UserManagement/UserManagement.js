import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav';
import UserTable from './UserTable';
import UserForm from './UserForm';
import clientAPI from '../../../client-api/rest-client';

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientAPI.service('user').find();
      setUsers(response.data);
      setSelectedUser(null);
    } catch (error) {
      console.error('Cannot fetch users:', error);
      setError('Could not load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-200 h-full">
        <SideNav />
      </div>
      <div className="w-4/5 p-4 overflow-auto">
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <UserTable users={users} onUserSelect={setSelectedUser} />
            <UserForm selectedUser={selectedUser} onRefresh={refreshUsers} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
