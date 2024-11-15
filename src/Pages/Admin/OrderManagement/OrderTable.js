import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  TablePagination,
} from '@mui/material';

const OrderTable = ({ orders, onOrderSelect, selectedOrderDetails = [] }) => {  // Default value assigned here
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameOfCustomer');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter orders based on search term and criteria
  const filteredOrders = orders.filter((order) =>
    order[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (orderId) => {
    onOrderSelect(orderId);
  };

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      {/* Orders Table */}
      <Paper sx={{ width: '60%', overflow: 'hidden' }}>
        <Typography variant="h5" component="h2" sx={{ p: 2, fontWeight: 'bold' }}>
          Danh sách đơn hàng
        </Typography>

        <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
          <TextField
            label="Tìm kiếm"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ flex: 1 }}
          />
          <TextField
            select
            label="Tìm kiếm theo"
            value={searchBy}
            onChange={handleSearchByChange}
            size="small"
            sx={{ width: 180 }}
          >
            <MenuItem value="nameOfCustomer">Tên Khách Hàng</MenuItem>
            <MenuItem value="dateOrder">Ngày Đặt Hàng</MenuItem>
            <MenuItem value="status">Trạng Thái</MenuItem>
          </TextField>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên Khách Hàng</TableCell>
                <TableCell>Ngày Đặt Hàng</TableCell>
                <TableCell>Tổng Tiền</TableCell>
                <TableCell>Trạng Thái</TableCell>
                <TableCell>Phương Thức Thanh Toán</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{order.nameOfCustomer}</TableCell>
                    <TableCell>{new Date(order.dateOrder).toLocaleDateString()}</TableCell>
                    <TableCell>{order.totalPrice.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.payment_method}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredOrders.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      {/* Selected Order Details Table */}
      <Paper sx={{ width: '40%', overflow: 'hidden' }}>
        <Typography variant="h5" component="h2" sx={{ p: 2, fontWeight: 'bold' }}>
          Chi tiết đơn hàng
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên Sản Phẩm</TableCell>
                <TableCell>Số Lượng</TableCell>
                <TableCell>Giá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrderDetails.length > 0 ? (
                selectedOrderDetails.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.nameOfProduct}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price.toLocaleString()} VNĐ</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Chưa có sản phẩm nào được chọn.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

OrderTable.propTypes = {
  orders: PropTypes.array.isRequired,
  onOrderSelect: PropTypes.func.isRequired,
  selectedOrderDetails: PropTypes.array, // Not required anymore since we handle default values in params
};

export default OrderTable;
