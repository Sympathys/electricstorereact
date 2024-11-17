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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';

const OrderTable = ({ orders, onOrderSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameOfCustomer');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);  // Store the selected order

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

  const handleRowClick = (orderId) => {
    onOrderSelect(orderId);
  };

  const handleRowDoubleClick = (order) => {
    setSelectedOrder(order);  // Set the selected order
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);  // Close the modal
  };

  const filteredOrders = orders.filter((order) =>
    order[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                <TableCell>ID Khách Hàng</TableCell>
                <TableCell>Tên Khách Hàng</TableCell>
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell>Địa Chỉ</TableCell>
                <TableCell>Ngày Đặt Hàng</TableCell>
                <TableCell>Tổng Tiền</TableCell>
                <TableCell>Phương Thức Thanh Toán</TableCell>
                <TableCell>Trạng Thái Thanh Toán</TableCell>
                <TableCell>Trạng Thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    onDoubleClick={() => handleRowDoubleClick(order)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{order.idCustomer}</TableCell>
                    <TableCell>{order.nameOfCustomer}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{new Date(order.dateOrder).toLocaleDateString()}</TableCell>
                    <TableCell>{order.totalPrice?.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{order.payment_method}</TableCell>
                    <TableCell>{order.isPayment ? 'Đã thanh toán' : 'Chưa thanh toán'}</TableCell>
                    <TableCell>{order.status}</TableCell>
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

      {/* Modal to show selected order details */}
      <Dialog open={selectedOrder !== null} onClose={handleCloseModal}>
        <DialogTitle>
          Thông Tin Đơn Hàng
          <Button onClick={handleCloseModal} sx={{ position: 'absolute', right: 8, top: 8 }}>
            X
          </Button>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="h6">Thông Tin Sản Phẩm</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên Sản Phẩm</TableCell>
                      <TableCell>Số Lượng</TableCell>
                      <TableCell>Đơn Giá</TableCell>
                      <TableCell>Tổng Giá</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.nameOfProduct}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price?.toLocaleString()} VNĐ</TableCell>
                        <TableCell>{(product.quantity * product.price)?.toLocaleString()} VNĐ</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderTable;
