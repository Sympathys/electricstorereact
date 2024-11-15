import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clientAPI from "../../client-api/rest-client";

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedItems = location.state?.selectedItems || [];
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("creditCard");

    const handleNameChange = (e) => setName(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handleAddressChange = (e) => setShippingAddress(e.target.value);
    const handlePaymentChange = (e) => setPaymentMethod(e.target.value);

    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const checkOutData = {
        nameOfCustomer: name,
        phone: phoneNumber,
        address: shippingAddress,
        payment_method: paymentMethod,
        products: selectedItems
    };

    const handleCheckoutSubmit = async () => {
        try {
            const data = await clientAPI.service('order').create(checkOutData);
    
            // Redirect to order pending page if payment method is COD
            if (paymentMethod === "Cod") {
                navigate("/order-pending", { state: { orderId: data.data._id } });
            } 
            else if (paymentMethod === "Bank") {
                
                navigate("/bank-transfer-qr-code", {state: {linkPayment: data.data.linkPayment}}); // Điều hướng đến trang QR code
                return; // Kết thúc hàm ở đây nếu là chuyển khoản ngân hàng
            }else {
                window.alert("Thanh toán thành công!");
            }
            
        } catch (error) {
            if (error.response && error.response.data) {
                window.alert(`Error: ${error.response.data.message}`);
            } else {
                window.alert("Error: Something went wrong");
            }
            console.log(error);
        }
    };
    
    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <h2 className="text-gray-900 text-2xl font-bold mb-4">Thanh toán</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Tên:</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Nhập tên của bạn"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Số điện thoại:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Nhập số điện thoại của bạn"
                />
            </div>

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
                    <option value="Bank">Chuyển khoản ngân hàng</option>
                    <option value="Cod">Thanh toán khi nhận hàng (COD)</option>
                </select>
            </div>

            <h3 className="text-gray-900 text-xl font-semibold mt-4 mb-2">Sản phẩm được chọn</h3>
            {selectedItems.length === 0 ? (
                <p className="text-gray-600">Không có sản phẩm nào được chọn.</p>
            ) : (
                selectedItems.map((item) => (
                    <div key={item.idProduct} className="border-b border-gray-200 py-2">
                        <p className="text-gray-900 font-bold">{item.nameOfProduct}</p>
                        <p className="text-gray-600">Số lượng: {item.quantity}</p>
                        <p className="text-red-500">{item.price} ₫</p>
                    </div>
                ))
            )}

            <div className="text-gray-900 font-bold text-lg mt-4">
                Tổng tiền: <span className="text-red-500">{calculateTotalPrice().toLocaleString()} ₫</span>
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
