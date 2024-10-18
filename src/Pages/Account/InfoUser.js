import React, { useState } from 'react';

const InfoUser = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: 'Lê Thanh Hùng',
    email: 'nhon@gmail.com',
    phoneNumber: '0123 456 789',
    address: 'Thống Nhất, Đông Hòa, Dĩ An, Bình Dương'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save user information logic
    console.log('User information saved:', userInfo);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <h2 className="text-2xl font-bold mb-4">THÔNG TIN CÁ NHÂN</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Họ và tên</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={userInfo.fullName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Sđt</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={userInfo.phoneNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Địa chỉ</label>
        <input
          id="address"
          name="address"
          type="text"
          value={userInfo.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Lưu
      </button>
    </div>
  );
};

export default InfoUser;
