import React, { useState } from "react";

const CheckoutPage = () => {
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("creditCard");

    const handleAddressChange = (e) => setShippingAddress(e.target.value);
    const handlePaymentChange = (e) => setPaymentMethod(e.target.value);

    const handleCheckoutSubmit = () => {
        // Handle checkout submission here
        if (!shippingAddress) {
            window.alert("Vui lòng nhập địa chỉ giao hàng.");
            return;
        }
        window.alert("Thanh toán thành công!");
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <h2 className="text-gray-900 text-2xl font-bold mb-4">Thanh toán</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Địa chỉ giao hàng:</label>
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Nhập địa chỉ của bạn"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Phương thức thanh toán:</label>
                <select
                    value={paymentMethod}
                    onChange={handlePaymentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                    <option value="creditCard">Thẻ tín dụng</option>
                    <option value="bankTransfer">Chuyển khoản ngân hàng</option>
                    <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                </select>
            </div>

            <div className="mt-4">
                <button
                    onClick={handleCheckoutSubmit}
                    className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                >
                    Xác nhận thanh toán
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
