import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clientAPI from "../../client-api/rest-client";
import axios from "axios";

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedItems = location.state?.selectedItems || [];
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Bank");

    // State for dropdowns
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    
// Fetch provinces
useEffect(() => {
    const fetchProvinces = async () => {
        try {
            const response = await axios.get("https://provinces.open-api.vn/api/p");
            setProvinces(response.data);
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };
    fetchProvinces();
}, []);

useEffect(() => {
    const fetchDistricts = async () => {
        if (selectedProvince) {
            try {
                // Fetch all districts
                const response = await axios.get("https://provinces.open-api.vn/api/d/");
                console.log(selectedProvince);
                // Duyệt qua tất cả các nhóm và lọc quận/huyện theo province_code
                const filteredDistricts = response.data.flatMap(group => {
                    // Chuyển đổi group thành mảng nếu cần (bảo đảm group là mảng)
                    const groupArray = Array.isArray(group) ? group : [group];
                    //console.log(groupArray);
                    // Lọc quận/huyện trong nhóm theo province_code
                    return groupArray.filter(district => String(district.province_code) === String(selectedProvince));
                });

                // Log the filtered districts to verify
                
                // Cập nhật danh sách các quận/huyện
                setDistricts(filteredDistricts);
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        }
    };

    fetchDistricts();
}, [selectedProvince]);


useEffect(() => {
    const fetchWards = async () => {
        if (selectedDistrict) {
            try {
                // Fetch all wards (phường xã)
                const response = await axios.get("https://provinces.open-api.vn/api/w/");
    
                console.log("Response Data:", response.data);  // Kiểm tra cấu trúc dữ liệu
    
                // Duyệt qua các nhóm bên ngoài và bên trong, sau đó lọc phường xã theo district_code
                const filteredWards = response.data.flatMap(group => {
                    // Kiểm tra nếu group là mảng, nếu không thì chuyển thành mảng
                    const groupArray = Array.isArray(group) ? group : [group];
                    console.log(groupArray);
                    // Duyệt qua các nhóm con bên trong (nếu có)
                    return groupArray.filter(ward => String(ward.district_code) === String(selectedDistrict));
                });
    
                // Log the filtered wards to verify
                console.log("Filtered Wards:", filteredWards);
    
                // Cập nhật danh sách phường xã
                setWards(filteredWards);
            } catch (error) {
                console.error("Error fetching wards:", error);
            }
        }
    };

    fetchWards();
}, [selectedDistrict]);

    

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
        // Lấy tên tỉnh, huyện, xã từ UI
        const provinceName = provinces.length > 0 
            ? document.querySelector("#province-dropdown option:checked")?.text || "" 
            : "";
        const districtName = districts.length > 0 
            ? document.querySelector("#district-dropdown option:checked")?.text || "" 
            : "";
        const wardName = wards.length > 0 
            ? document.querySelector("#ward-dropdown option:checked")?.text || "" 
            : "";
    
        // Ghép địa chỉ đầy đủ
        const fullShippingAddress = `${shippingAddress}, ${wardName}, ${districtName}, ${provinceName}`;
        
        // Dữ liệu gửi lên server
        const checkOutData = {
            nameOfCustomer: name,
            phone: phoneNumber,
            address: fullShippingAddress,
            payment_method: paymentMethod,
            products: selectedItems
        };
    
        try {
            const data = await clientAPI.service('order').create(checkOutData);
            if (paymentMethod === "Cod") {
                navigate("/order-pending", { state: { orderId: data.data._id } });
            } else if (paymentMethod === "Bank") {
                navigate("/bank-transfer-qr-code", { state: { linkPayment: data.data.linkPayment } });
            } else {
                window.alert("Thanh toán thành công!");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            window.alert(`Error: ${errorMessage}`);
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
                <label className="block text-gray-700 font-bold mb-2">Tỉnh/Thành phố:</label>
                <select
                    id="province-dropdown"
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                            {province.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Quận/Huyện:</label>
                <select
                    id="district-dropdown"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                            {district.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Xã/Phường:</label>
                <select
                    id="ward-dropdown"
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                    <option value="">Chọn xã/phường</option>
                    {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                            {ward.name}
                        </option>
                    ))}
                </select>
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
                        <p className="text-red-500">{item.price * item.quantity} đ</p>
                    </div>
                ))
            )}

            <div className="mt-4">
                <p className="text-lg font-semibold">Tổng tiền: {calculateTotalPrice()} đ</p>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
                >
                    Quay lại
                </button>
                <button
                    onClick={handleCheckoutSubmit}
                    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                >
                    Thanh toán
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
