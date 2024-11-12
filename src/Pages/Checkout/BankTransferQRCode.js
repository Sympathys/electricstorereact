// BankTransferQRCode.js
import React from "react";
import { useNavigate } from "react-router-dom";

const BankTransferQRCode = () => {
    const navigate = useNavigate();

    const handleReturnToCheckout = () => {
        navigate("/checkout"); // Quay lại trang thanh toán nếu cần
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Chuyển khoản ngân hàng</h1>
            <p className="text-gray-700 mb-4">Vui lòng quét mã QR dưới đây để thanh toán.</p>

            {/* Giả sử mã QR là hình ảnh tĩnh */}
            <img
                src="/path-to-your-qr-code.png" // Thay đổi đường dẫn tới QR code của bạn
                alt="QR Code"
                className="mx-auto mb-6 w-48 h-48"
            />

            <p className="text-gray-500 mb-6">
                Sau khi thanh toán, vui lòng quay lại để hoàn tất đơn hàng.
            </p>

            <button
                onClick={handleReturnToCheckout}
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
            >
                Quay lại trang thanh toán
            </button>
        </div>
    );
};

export default BankTransferQRCode;
