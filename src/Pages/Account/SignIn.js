import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  // Lưu biến cho tên, email, mật khẩu và xác nhận mật khẩu
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Lưu lỗi
  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  // Hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    // Kiểm tra các trường nhập liệu
    if (!name) {
      setErrName("Vui lòng nhập tên.");
    } else {
      setErrName("");
    }

    if (!email) {
      setErrEmail("Vui lòng nhập email.");
    } else {
      setErrEmail("");
    }

    if (!password) {
      setErrPassword("Vui lòng nhập mật khẩu.");
    } else {
      setErrPassword("");
    }

    if (password !== confirmPassword) {
      setErrConfirmPassword("Mật khẩu không khớp.");
    } else {
      setErrConfirmPassword("");
    }

    // Thực hiện đăng ký khi tất cả điều kiện hợp lệ
    if (name && email && password && password === confirmPassword) {
      console.log("Đăng ký thành công");
      // Thực hiện logic đăng ký
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg w-80 mx-auto bg-white">
      <h2 className="text-2xl mb-4">Đăng ký</h2>
      <div className="flex justify-center mb-4 w-full">
      <Link to="/login" className="bg-white text-black border border-gray-300 py-2 px-4 rounded-l-lg w-1/2 text-center">
          Đăng nhập
        </Link>
        <button className="bg-pink-500 text-white py-2 px-4 rounded-r-lg w-1/2">
          Đăng ký
        </button>
        </div>
      <input
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />
      {errName && <p className="text-red-500 text-sm">{errName}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />
      {errEmail && <p className="text-red-500 text-sm">{errEmail}</p>}
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
      <div className="relative w-full mb-2">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-2 top-2 text-gray-500"
        >
          👁️
        </button>
      </div>
      {errConfirmPassword && <p className="text-red-500 text-sm">{errConfirmPassword}</p>}
      <button
        onClick={handleSignUp}
        className="bg-pink-500 text-white py-2 px-4 rounded-md w-full mb-2"
      >
        Đăng ký
      </button>
      <p className="text-sm">
        Đã có tài khoản?{" "}
        <a href="#" className="text-pink-500 font-bold">
          Đăng nhập ngay
        </a>
      </p>
    </div>
  );
};

export default SignIn;
