import React, { useState } from 'react';
import PropTypes from 'prop-types';

const OrderTable = ({ orders, onOrderSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameCustomer');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredOrders.length === 0 && (
        <p className="text-red-500">Không tìm thấy đơn hàng nào phù hợp.</p>
      )}

      <div className="mb-4 flex items-center space-x-2">
        <input
          id="search"
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          value={searchTerm}
          onChange={handleSearch}
          className="border py-2 px-3 w-1/2"
        />
        <select onChange={handleSearchByChange} value={searchBy} className="border py-2 px-3">
          <option value="nameCustomer">Khách Hàng</option>
          <option value="dateOrder">Ngày Đặt Hàng</option>
          <option value="totalPrice">Tổng Tiền</option>
          <option value="status">Trạng Thái</option>
        </select>
      </div>

      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID Đơn Hàng</th>
            <th className="py-2 px-4 border">Khách Hàng</th>
            <th className="py-2 px-4 border">Số Điện Thoại</th>
            <th className="py-2 px-4 border">Địa Chỉ</th>
            <th className="py-2 px-4 border">Ngày Đặt Hàng</th>
            <th className="py-2 px-4 border">Tổng Tiền</th>
            <th className="py-2 px-4 border">Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr
                key={order._id}
                onClick={() => onOrderSelect(order._id)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-2 px-4 border">{order._id}</td>
                <td className="py-2 px-4 border">{order.nameCustomer}</td>
                <td className="py-2 px-4 border">{order.phone}</td>
                <td className="py-2 px-4 border">{order.address}</td>
                <td className="py-2 px-4 border">{order.dateOrder}</td>
                <td className="py-2 px-4 border">{order.totalPrice}</td>
                <td className="py-2 px-4 border">{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-2 px-4 border text-center">Không có đơn hàng nào để hiển thị.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

OrderTable.propTypes = {
  orders: PropTypes.array.isRequired,
  onOrderSelect: PropTypes.func.isRequired,
};

export default OrderTable;
