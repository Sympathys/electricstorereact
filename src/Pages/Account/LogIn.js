import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const LogIn = () => {
  // Lưu biến account và password người dùng nhập
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  // Lưu lỗi với account và password
  const [errAccount, setErrAcc] = useState("");
  const [errPassword, setErrPassword] = useState("");
  // Hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Kiểm tra điều kiện đăng nhập
    if (!account) {
      setErrAcc("Vui lòng nhập email.");
    } else {
      setErrAcc("");
    }

    if (!password) {
      setErrPassword("Vui lòng nhập mật khẩu.");
    } else {
      setErrPassword("");
    }

    // Thực hiện đăng nhập khi đủ điều kiện
    if (account && password) {
      console.log("Đăng nhập thành công");
      // Thực hiện logic đăng nhập
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg w-80 mx-auto bg-white">
      <h2 className="text-2xl mb-4">Đăng nhập</h2>
      <div className="flex justify-center mb-4 w-full">
      <button className="bg-pink-500 text-white py-2 px-4 rounded-l-lg w-1/2">
          Đăng nhập
        </button>
        <Link to="/signin" className="bg-white text-black border border-gray-300 py-2 px-4 rounded-r-lg w-1/2 text-center">
          Đăng ký
        </Link>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />
      {errAccount && <p className="text-red-500 text-sm">{errAccount}</p>}
      <div className="relative w-full mb-2">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-500"
        >
          👁️
        </button>
      </div>
      {errPassword && <p className="text-red-500 text-sm">{errPassword}</p>}
      <Link to="/ForgetPassword" className="text-pink-500 text-sm mb-4 self-start">
        Quên mật khẩu?
      </Link>
      <button
        onClick={handleLogin}
        className="bg-pink-500 text-white py-2 px-4 rounded-md w-full mb-2"
      >
        Đăng nhập
      </button>
      <p className="text-sm">
        Chưa có tài khoản?{" "}
        <a href="#" className="text-pink-500 font-bold">
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
};

export default LogIn;
