import React, { useState } from "react";
import { Route } from "react-router-dom";

const ForgetPassWord = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện logic lấy lại mật khẩu ở đây (gửi email hoặc yêu cầu từ server)
    console.log("Email:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Quên mật khẩu</h2>
        <p className="text-center mb-6">
          Hãy nhập email của bạn để lấy lại mật khẩu
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Lấy lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassWord;