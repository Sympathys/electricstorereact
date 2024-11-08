import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import clientAPI from '../../../client-api/rest-client';
import '@fontsource/noto-sans/400.css'; // Regular



const OrderForm = ({ selectedOrder, onRefresh }) => {
  // State để quản lý các trường form và thông báo lỗi
  const [order, setOrder] = useState({
    idCustomer: '',
    nameCustomer: '',
    phone: '',
    address: '',
    dateReceived: '',
    totalPrice: '',
    payment_method: 'Cash',
    status: 'Chờ thanh toán', // Trạng thái mặc định
  });
  const [error, setError] = useState('');

  // Sử dụng useEffect để lấy chi tiết đơn hàng khi selectedOrder thay đổi
  useEffect(() => {
    if (selectedOrder) {
      fetchOrderById(selectedOrder._id);
    } else {
      resetForm(); // Đặt lại form nếu không có đơn hàng được chọn
    }
  }, [selectedOrder]);

  // Hàm lấy chi tiết đơn hàng theo ID
  const fetchOrderById = async (id) => {
    try {
      const response = await clientAPI.get(id);
      const orderDetails = response.data;

      if (orderDetails && orderDetails._id) {
        setOrder({
          idCustomer: orderDetails.idCustomer,
          nameCustomer: orderDetails.nameCustomer,
          phone: orderDetails.phone,
          address: orderDetails.address,
          dateReceived: orderDetails.dateReceived || '',
          totalPrice: orderDetails.totalPrice,
          payment_method: orderDetails.payment_method,
          status: orderDetails.status,
        });
        setError(''); // Đặt lại lỗi nếu có
      } else {
        setError('Không tìm thấy đơn hàng!');
      }
    } catch (error) {
      setError('Không thể tải chi tiết đơn hàng!');
    }
  };

  // Xử lý thay đổi giá trị các trường input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
    setError(''); // Xóa lỗi khi có thay đổi input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Kiểm tra các trường bắt buộc
    if (!order.nameCustomer || !order.phone || !order.address || Number(order.totalPrice) <= 0) {
      setError('Vui lòng điền đầy đủ thông tin đơn hàng!');
      return;
    }
  
    const formData = {
      idCustomer: order.idCustomer,
      nameCustomer: order.nameCustomer,
      phone: order.phone,
      address: order.address,
      dateReceived: order.dateReceived,
      totalPrice: Number(order.totalPrice),
      payment_method: order.payment_method,
      status: order.status,
    };
  
    try {
      // Chỉ gọi API mà không cần lưu response nếu không dùng
      if (selectedOrder) {
        await clientAPI.patch(`${selectedOrder._id}`, formData);
      } else {
        await clientAPI.create(formData);
      }
  
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      setError('Có lỗi xảy ra khi thêm/cập nhật đơn hàng!');
    }
  };
  

  // Xử lý xóa đơn hàng
  const handleDelete = async () => {
    if (!selectedOrder) return;
    try {
      await clientAPI.remove(`/order/${selectedOrder._id}`);
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      setError('Có lỗi xảy ra khi xóa đơn hàng!');
    }
  };

  // Đặt lại form về trạng thái ban đầu
  const resetForm = () => {
    setOrder({
      idCustomer: '',
      nameCustomer: '',
      phone: '',
      address: '',
      dateReceived: '',
      totalPrice: '',
      payment_method: 'Cash',
      status: 'Chờ thanh toán',
    });
    setError('');
  };

// Xuất thông tin đơn hàng ra file PDF
const handleExportToPDF = () => {
  if (!selectedOrder) {
    console.error("Không có đơn hàng nào được chọn để xuất!");
    return;
  }

  const pdf = new jsPDF();

  // Thêm tiêu đề
  pdf.setFont('Noto Sans', 'normal');
  pdf.setFontSize(18);
  pdf.text('Chi tiết đơn hàng', 10, 10);

  // Thêm thông tin đơn hàng
  pdf.setFontSize(12);
  pdf.text(`ID Khách hàng: ${selectedOrder.idCustomer}`, 10, 20);
  pdf.text(`Tên Khách hàng: ${selectedOrder.nameCustomer}`, 10, 30);
  pdf.text(`Số Điện Thoại: ${selectedOrder.phone}`, 10, 40);
  pdf.text(`Địa Chỉ: ${selectedOrder.address}`, 10, 50);
  pdf.text(`Ngày Nhận: ${selectedOrder.dateReceived}`, 10, 60);
  pdf.text(`Tổng Giá: ${selectedOrder.totalPrice} VNĐ`, 10, 70);
  pdf.text(`Phương Thức Thanh Toán: ${selectedOrder.payment_method}`, 10, 80);
  pdf.text(`Trạng Thái: ${selectedOrder.status}`, 10, 90);

  // Lưu PDF
  pdf.save('order-details.pdf');
};



  return (
    <div className="order-form p-4 bg-white border ml-4 h-full flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Thêm phần tử có id="orderDetails" để export PDF */}
      <div id="orderDetails">
        <form onSubmit={handleSubmit} className="flex-grow">
          {/* Các trường form */}
          <div className="mb-4">
            <label className="block mb-2">ID đơn hàng</label>
            <input
              type="text"
              name="idCustomer"
              value={order.idCustomer}
              onChange={handleChange}
              className="border py-2 px-3 w-full"
              disabled={!!selectedOrder}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tên khách hàng</label>
            <input
              type="text"
              name="nameCustomer"
              value={order.nameCustomer}
              onChange={handleChange}
              className="border py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={order.phone}
              onChange={handleChange}
              className="border py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={order.address}
              onChange={handleChange}
              className="border py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Ngày nhận</label>
            <input
              type="date"
              name="dateReceived"
              value={order.dateReceived}
              onChange={handleChange}
              className="border py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tổng giá</label>
            <input
              type="text"
              name="totalPrice"
              value={order.totalPrice}
              onChange={handleChange}
              className="border py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phương thức thanh toán</label>
            <select
              name="payment_method"
              value={order.payment_method}
              onChange={handleChange}
              className="border py-2 px-3 w-full"
            >
              <option value="Cash">Tiền mặt</option>
              <option value="Momo">Momo</option>
              <option value="COD">COD</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Trạng thái</label>
            <select
              name="status"
              value={order.status}
              onChange={handleChange}
              className="border py-2 px-3 w-full"
            >
              <option value="Chờ thanh toán">Chờ thanh toán</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
            </select>
          </div>
        </form>
      </div>

      {/* Các nút hành động */}
      <div className="flex justify-between">
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Thêm</button>
        <button
          type="button"
          onClick={handleSubmit}
          className={`bg-green-500 text-white px-4 py-2 rounded ${!selectedOrder ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedOrder}
        >
          Sửa
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className={`bg-red-500 text-white px-4 py-2 rounded ${!selectedOrder ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedOrder}
        >
          Xóa
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Đặt lại
        </button>
        <button type="button" onClick={handleExportToPDF} className="bg-blue-500 text-white px-4 py-2 rounded">Xuất PDF</button>
      </div>
    </div>
  );
};

export default OrderForm;
