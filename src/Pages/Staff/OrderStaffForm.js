import React, { useEffect, useState } from "react";
import clientAPI from "../../client-api/rest-client";
import { useNavigate } from "react-router-dom";

const OrderStaffForm = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const staffId = user?.data._id;

    const loadAssignedOrders = async () => {
        try {
            const response = await clientAPI.service('order').find({
                query: { assignedStaffId: staffId }
            });
            if (Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(`Error: ${error.response.data.message}`);
            } else {
                console.log("Error: Something went wrong");
            }
            console.log(error);
        }
    };

    useEffect(() => {
        loadAssignedOrders();
    }, []);

    const handleOrderClick = (orderId) => {
        navigate(`/OrderDetail/${orderId}`);
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                <h2 className="text-gray-900 text-2xl font-bold mb-4">Đơn hàng được giao</h2>
                {orders.length === 0 ? (
                    <p className="text-gray-600">Không có đơn hàng nào được giao cho bạn.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="flex items-center justify-between border-b border-gray-200 py-4">
                            <div className="flex-1">
                                <h3 className="text-gray-900 text-lg font-bold">Đơn hàng #{order._id}</h3>
                                <p className="text-gray-600 text-sm">
                                    Ngày đặt: {new Date(order.dateOrder).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    Ngày giao: {new Date(order.dateDelivery) < new Date(order.dateOrder)
                                        ? "Chưa giao hàng"
                                        : new Date(order.dateDelivery).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </p>
                                <p className="text-green-500 text-md font-semibold">{order.totalPrice} ₫</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={() => handleOrderClick(order._id)}
                                    className="text-pink-500 hover:text-pink-700 text-sm"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderStaffForm;
