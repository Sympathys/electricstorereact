import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Ensure this path is correct

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dfsxqmwkz/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "Upload_image"; // Replace with your actual preset

const UserForm = ({ selectedUser, onRefresh }) => {
  const [user, setUser] = useState({
    _id: '', // Change idAccount to _id
    name: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    photo: '', // Holds Cloudinary image URL
  });

  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null); // For image preview

  useEffect(() => {
    if (selectedUser) {
      setUser({
        _id: selectedUser._id,
        name: selectedUser.name,
        gender: selectedUser.gender,
        phone: selectedUser.phone,
        email: selectedUser.email,
        address: selectedUser.address,
        photo: selectedUser.photo, // Lưu ảnh từ user đã chọn
      });
      setPreviewImage(selectedUser.photo); // Hiển thị ảnh đã lưu nếu có
    } else {
      resetForm();
    }
  }, [selectedUser]);
  
  // Đảm bảo ảnh preview được cập nhật đúng URL từ Cloudinary
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  
      try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        if (data.secure_url) {
          setUser((prevUser) => ({
            ...prevUser,
            photo: data.secure_url, // Lưu ảnh từ Cloudinary
          }));
          setPreviewImage(data.secure_url); // Cập nhật ảnh preview
        } else {
          setError('Ảnh không thể tải lên Cloudinary!');
        }
      } catch (error) {
        console.error('Lỗi khi tải ảnh lên Cloudinary:', error);
        setError('Lỗi khi tải ảnh lên!');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the data before submitting to check values
    console.log("User Data to Submit:", user);
  
    // Validation: Ensure required fields are filled (check only fields that are actually required)
    if (!user.name || !user.email || !user.phone || !user.gender) {
      setError('Please fill in all required fields!');
      return;
    }
  
    try {
      let response;
      // Remove _id if it exists to prevent sending it in the API request
      const userDataWithoutId = { ...user };
      delete userDataWithoutId._id; // Make sure no _id is included in the request
  
      // Handle create or update based on whether there's a selectedUser
      if (selectedUser && selectedUser._id) {
        // Update the user based on selectedUser._id
        response = await clientAPI.service('user').patch(selectedUser._id, userDataWithoutId);
        console.log('User updated successfully:', response);
      } else {
        // Create a new user
        response = await clientAPI.service('user').create(userDataWithoutId); // Use data without _id
        console.log('New user created successfully:', response);
      }
  
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error adding/updating user:', error.response ? error.response.data : error.message);
      setError('An error occurred while adding/updating the user!');
    }
  };

  const resetForm = () => {
    setUser({
      _id: '', 
      name: '',
      gender: 'Male',
      phone: '',
      email: '',
      address: '',
      photo: '', // Reset photo field
    });
    setPreviewImage(null);
    setError('');
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await clientAPI.delete(`users/${user._id}`); // Use _id for delete action
      console.log('User has been deleted successfully');
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
      setError('An error occurred while deleting user!');
    }
  };

  return (
    <div className="user-form p-4 bg-white border ml-4 h-full flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex-grow">
        {/* Dynamic form fields */}
        {[{ label: 'User Name', type: 'text', name: 'name' },
          { label: 'Gender', type: 'text', name: 'gender' },
          { label: 'Phone', type: 'text', name: 'phone' },
          { label: 'Email', type: 'email', name: 'email' },
          { label: 'Address', type: 'text', name: 'address' }].map(({ label, type, ...inputProps }, index) => (
            <div key={index} className="mb-3">
              <label className="block mb-1 text-sm">{label}</label>
              <input
                type={type}
                {...inputProps}
                value={user[inputProps.name] || ''}
                onChange={handleChange}
                className="border py-1 px-2 w-full"
              />
            </div>
          ))}

        {/* File input for photo */}
        <div className="mb-3">
          <label className="block mb-1 text-sm">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border py-1 px-2 w-full"
          />
        </div>

        {/* Image preview with frame */}
        <div className="mb-3 flex justify-center items-center">
          <div className="w-32 h-32 bg-gray-200 flex justify-center items-center border border-dashed border-gray-400">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-600">No Image</span>
            )}
          </div>
        </div>

        {/* Button actions */}
        <div className="flex space-x-4 mt-4">
          {[{ label: 'Thêm', onClick: handleSubmit, color: 'yellow-500', disabled: false },
            { label: 'Sửa', onClick: handleSubmit, color: 'green-500', disabled: !selectedUser },
            { label: 'Xóa', onClick: handleDelete, color: 'red-500', disabled: !selectedUser },
            { label: 'Làm mới', onClick: () => { resetForm(); onRefresh(); }, color: 'blue-500' },
            { label: 'Save', onClick: handleSubmit, color: 'purple-500', disabled: !user.name || !user.phone || !user.email }].map(({ label, onClick, color, disabled }, idx) => (
              <button
                key={idx}
                type="button"
                onClick={onClick}
                className={`bg-${color} text-white px-3 py-1 text-sm rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={disabled}
              >
                {label}
              </button>
            ))}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
