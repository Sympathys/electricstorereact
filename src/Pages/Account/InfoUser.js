import React, { useState, useEffect } from 'react';
import clientAPI from '../../client-api/rest-client';

const InfoUser = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    gender: "Male",
    phone: "",
    email: "",
    address: "",
    photo: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.idUser;
    console.log(userId);

    const fetchUserInfo = async () => {
      try {
        const data = await clientAPI.service('user').get(userId);
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
    const user = JSON.parse(localStorage.getItem('user'));
  
    try {
      const data = await clientAPI.service('user').patch(user.idUser, userInfo);
      window.alert("Thông tin người dùng đã được lưu thành công!"); // Success message
    } catch (error) {
      console.error("Error saving user information:", error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <h2 className="text-2xl font-bold mb-4">THÔNG TIN CÁ NHÂN</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Họ và tên</label>
        <input
          id="name"
          name="name"
          type="text"
          value={userInfo.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Giới tính</label>
        <select
          id="gender"
          name="gender"
          value={userInfo.gender}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Số điện thoại</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={userInfo.phone}
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
