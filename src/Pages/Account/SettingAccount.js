import React from "react";

const SettingAccount = () => {
  return (
    <div className="max-w-xs bg-white p-4 rounded-lg shadow-md">
      {/* Avatar và thông tin cá nhân */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
          {/* Biểu tượng Avatar */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-pink-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14c2.21 0 4-1.79 4-4S14.21 6 12 6s-4 1.79-4 4 1.79 4 4 4z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-lg font-semibold">Lê Thanh Hùng</p>
          <p className="text-gray-500">0123 456 789</p>
        </div>
      </div>

      {/* Các tùy chọn */}
      <div className="space-y-2">
        {/* Đơn hàng */}
        <button className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-pink-500 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18v6H3V3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 21h6m-3-3v3m9-3H3v-6h18v6z"
            />
          </svg>
          Đơn hàng
        </button>

        {/* Thông tin cá nhân */}
        <button className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-pink-500 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.318C9.253 5.61 7 8.658 7 12.5 7 17 10.134 20 14 20c3.866 0 7-3.133 7-7.5C21 8.71 16.418 4.746 12 4.318z"
            />
          </svg>
          Thông tin cá nhân
        </button>

        {/* Đổi mật khẩu */}
        <button className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-pink-500 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v6a2 2 0 002 2h4m10-6h-4m0 0V6m0 6v6"
            />
          </svg>
          Đổi mật khẩu
        </button>

        {/* Quên mật khẩu */}
        <button className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-pink-500 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2m0 0V6m0 0L5 19"
            />
          </svg>
          Quên mật khẩu
        </button>

        {/* Đăng xuất */}
        <button className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-pink-500 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v4m0-4V4"
            />
          </svg>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default SettingAccount;
