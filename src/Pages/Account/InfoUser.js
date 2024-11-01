import React, { useState, useEffect } from 'react';
import clientAPI from '../../client-api/rest-client';
import Cookies from 'js-cookie';
const InfoUser = () => {
  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const fetchUserInfo = async () => {
      try {
        const data = await clientAPI.service('user').get('information');
        console.log(data);
        setUserInfo(data.data); // Update user info based on API response
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await clientAPI.patch(userInfo._id, userInfo); // Cập nhật thông tin người dùng
      console.log('User information saved:', userInfo);
    } catch (error) {
      console.error("Error saving user information:", error);
    }
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
          value={userInfo.name}
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
