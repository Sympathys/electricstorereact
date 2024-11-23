import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client'; // Ensure this path is correct

const OrderForm = ({ selectedOrder, onRefresh }) => {
  const [order, setOrder] = useState({
    _id: '',
    idCustomer: '',
    nameCustomer: '',
    phone: '',
    address: '',
    dateOrder: '',
    dateReceived: '',
    totalPrice: '',
    payment_method: 'Momo',
    isPayment: false,
    idCart: '',
    status: 'Chờ thanh toán',
  });

  const [error, setError] = useState('');

  // Function to format date to 'YYYY-MM-DD'
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Converts to YYYY-MM-DD format
  };

  useEffect(() => {
    if (selectedOrder) {
      setOrder({
        _id: selectedOrder._id,
        idCustomer: selectedOrder.idCustomer,
        nameCustomer: selectedOrder.nameCustomer,
        phone: selectedOrder.phone,
        address: selectedOrder.address,
        dateOrder: selectedOrder.dateOrder ? formatDate(selectedOrder.dateOrder) : '',
        dateReceived: selectedOrder.dateReceived ? formatDate(selectedOrder.dateReceived) : '',
        totalPrice: selectedOrder.totalPrice,
        payment_method: selectedOrder.payment_method,
        isPayment: selectedOrder.isPayment,
        idCart: selectedOrder.idCart,
        status: selectedOrder.status,
      });
    } else {
      resetForm();
    }
  }, [selectedOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the status is changed to "Đã thanh toán", set dateReceived to current date
    if (name === 'status' && value === 'Đã thanh toán') {
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: value,
        dateReceived: formatDate(new Date()), // Set current date for "dateReceived"
      }));
    } else {
      setOrder((prevOrder) => ({
        ...prevOrder,
        [name]: value,
      }));
    }
  
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderId = order._id;

    try {
      if (orderId) {
        const response = await clientAPI.patch(`${orderId}`, order); // Use correct API path
        if (response.success) {
          console.log('Order updated successfully');
          if (onRefresh) onRefresh();
        } else {
          console.error('Error updating order:', response.message);
          setError(response.message);
        }
      } else {
        const response = await clientAPI.post('order', order); // Use correct API path for new order
        if (response.success) {
          console.log('Order added successfully');
          if (onRefresh) onRefresh();
        } else {
          console.error('Error adding order:', response.message);
          setError(response.message);
        }
      }
    } catch (error) {
      console.error('Error adding/updating order:', error.response ? error.response.data : error);
      setError('An error occurred while adding/updating order!');
    }
  };

  const handleDelete = async () => {
    if (!selectedOrder) return;
    try {
      await clientAPI.delete(`order/${order._id}`); // Use _id for delete action
      console.log('Order has been deleted successfully');
      resetForm();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting order:', error.response ? error.response.data : error.message);
      setError('An error occurred while deleting order!');
    }
  };

  const resetForm = () => {
    setOrder({
      _id: '',
      idCustomer: '',
      nameCustomer: '',
      phone: '',
      address: '',
      dateOrder: '', // Ensure this is cleared correctly
      dateReceived: '',
      totalPrice: '',
      payment_method: 'Momo',
      isPayment: false,
      idCart: '',
      status: 'Chờ thanh toán',
    });
    setError('');
  };

  return (
    <div className="order-form p-4 bg-white border ml-4 h-full flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex-grow">
        {[ 
          { label: 'Tên Khách hàng', type: 'text', name: 'nameCustomer', required: true },
          { label: 'Số điện thoại', type: 'text', name: 'phone', required: true },
          { label: 'Đìa chỉ', type: 'text', name: 'address', required: true },
          { label: 'Ngày đặt', type: 'date', name: 'dateOrder', required: true },
          { label: 'Ngày nhận', type: 'date', name: 'dateReceived' },
          { label: 'Tổng tiền', type: 'number', name: 'totalPrice', required: true },
        ].map(({ label, type, ...inputProps }, index) => (
          <div key={index} className="mb-3">
            <label className="block mb-1 text-sm font-medium">{label}</label>
            <input
              type={type}
              {...inputProps}
              value={order[inputProps.name] || ''}
              onChange={handleChange}
              className="border py-1 px-2 w-full text-sm rounded-md"
            />
          </div>
        ))}
  
        {/* Payment Method Dropdown */}
        <div className="mb-3">
          <label className="block mb-1 text-sm">Payment Method</label>
          <select
            name="Phương thức thanh toán"
            value={order.payment_method}
            onChange={handleChange}
            className="border py-1 px-2 w-full"
          >
            <option value="Bank">Bank</option>
            <option value="Cod">Cod</option>
          </select>
        </div>
  
        {/* Order Status Dropdown */}
        <div className="mb-3">
          <label className="block mb-1 text-sm">Trạng thái thanh toán</label>
          <select
            name="status"
            value={order.status}
            onChange={handleChange}
            className="border py-1 px-2 w-full"
          >
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Chờ lấy hàng">Chờ lấy hàng</option>
            <option value="Đang vận chuyển">Đang vận chuyển</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Đã giao">Đã giao</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>
  
        {/* Action Buttons */}
        <div className="flex space-x-4 mt-4">
          {[ 
            { label: 'Thêm', onClick: handleSubmit, color: 'yellow-500', disabled: false },
            { label: 'Sửa', onClick: handleSubmit, color: 'green-500', disabled: !selectedOrder },
            { label: 'Xóa', onClick: handleDelete, color: 'red-500', disabled: !selectedOrder },
            { label: 'Làm mới', onClick: () => { resetForm(); onRefresh(); }, color: 'blue-500' },
            { label: 'Save', onClick: handleSubmit, color: 'purple-500', disabled: !order.nameCustomer || !order.phone || !order.totalPrice }, // Disabled if fields are empty
          ].map(({ label, onClick, color, disabled }, idx) => (
            <button
              key={idx}
              type="button"
              onClick={onClick}
              className={`bg-${color} text-white px-3 py-1 text-sm rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={disabled}
            >
              {label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
  
};

export default OrderForm;
