import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Ensure the path is correct

const AccountForm = ({ selectedAccount, onRefresh }) => {
  const [account, setAccount] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    status: 'Active', // Default status
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedAccount) {
      setAccount({
        username: selectedAccount.username,
        email: selectedAccount.email, // Do not allow email to be changed
        password: '', // Do not display password
        role: selectedAccount.role,
        status: selectedAccount.isActive ? 'Active' : 'Inactive', // Status based on isActive
      });
    } else {
      resetForm();
    }
  }, [selectedAccount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
    setError('');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
  
    // Kiểm tra các trường bắt buộc
    if (!account.username || !account.email || !account.password || !account.role || !account.status) {
      setError('Vui lòng điền đầy đủ thông tin tài khoản!');
      return;
    }
  
    // Chuẩn bị dữ liệu để gửi lên server
    const formData = {
      username: account.username,  // Tên tài khoản
      email: account.email, // Email tài khoản
      password: account.password, // Mật khẩu
      role: account.role, // Vai trò (role)
      isActive: account.status === 'Active', // Trạng thái hoạt động (chuyển sang boolean)
    };
  
    try {
      // Gửi yêu cầu tạo tài khoản
      await clientAPI.create(formData);
      resetForm();  // Đặt lại form
      if (onRefresh) onRefresh();  // Refresh nếu cần
    } catch (error) {
      setError('Có lỗi xảy ra khi thêm tài khoản!');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check required fields
    if (!account.username || !account.role || !account.status) {
      setError('Vui lòng điền đầy đủ thông tin tài khoản!');
      return;
    }

    // Prepare the data to send for updating
    const formData = {
      username: account.username,
      role: account.role,
      isActive: account.status === 'Active',
    };

    if (account.password) {
      formData.password = account.password;
    }

    try {
      await clientAPI.patch(`${selectedAccount._id}`, formData);
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      setError('Có lỗi xảy ra khi cập nhật tài khoản!');
    }
  };

  const handleDelete = async () => {
    if (!selectedAccount) return;
    try {
      await clientAPI.remove(`${selectedAccount._id}`);
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      setError('Có lỗi xảy ra khi xóa tài khoản!');
    }
  };

  const resetForm = () => {
    setAccount({
      username: '',
      email: '',
      password: '',
      role: 'user',
      status: 'Active',
    });
    setError('');
  };

  return (
    <div className="account-form p-4 bg-white border ml-4 h-full flex flex-col">
      {error && <p className="text-red-500">{error}</p>}

      <form className="flex-grow">
        {[ 
          { label: 'Tài khoản', type: 'text', name: 'username' },
          { label: 'Email', type: 'email', name: 'email', disabled: !!selectedAccount },
          { label: 'Mật khẩu', type: 'password', name: 'password', disabled: !!selectedAccount },
          { label: 'Quyền', type: 'select', name: 'role', options: [{ value: 'user', label: 'User' }, { value: 'admin', label: 'Admin' }] },
          { label: 'Trạng thái', type: 'select', name: 'status', options: [{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }] },
        ].map(({ label, type, options, disabled, ...inputProps }, index) => (
          <div key={index} className="mb-3">
            <label className="block mb-1 text-sm font-medium">{label}</label>
            {type === 'select' ? (
              <select
                {...inputProps}
                className="border py-1 px-2 w-full text-sm rounded-md"
                onChange={handleChange}
                value={account[inputProps.name] || ''}
                disabled={disabled}
              >
                <option value="">{`Chọn ${label.toLowerCase()}`}</option>
                {options?.map((opt, idx) => (
                  <option key={idx} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                {...inputProps}
                value={account[inputProps.name] || ''}
                onChange={handleChange}
                className="border py-1 px-2 w-full text-sm rounded-md"
                disabled={disabled}
              />
            )}
          </div>
        ))}
      </form>

      <div className="flex space-x-3 mt-4">
        <button
          type="button"
          onClick={handleCreate}
          className="bg-yellow-500 text-white px-3 py-1 text-sm rounded-md"
        >
          Thêm
        </button>
        <button
          type="button"
          onClick={handleUpdate}
          className={`bg-green-500 text-white px-3 py-1 text-sm rounded-md ${!selectedAccount ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedAccount}
        >
          Sửa
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className={`bg-red-500 text-white px-3 py-1 text-sm rounded-md ${!selectedAccount ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedAccount}
        >
          Xóa
        </button>
        <button
          type="button"
          onClick={() => { resetForm(); if (onRefresh) onRefresh(); }}
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md"
        >
          Làm mới
        </button>
      </div>
    </div>
  );
};

export default AccountForm;
