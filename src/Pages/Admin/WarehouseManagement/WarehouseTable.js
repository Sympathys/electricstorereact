import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, MenuItem, Box, TablePagination
} from '@mui/material';

const WarehouseTable = ({ warehouses, onWarehouseSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameOfProduct'); // Default search by product name
  const [page, setPage] = useState(0); // Current page index
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

  // Filter the warehouse data based on search criteria
  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle number of rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  // Get the current page data
  const currentPageData = filteredWarehouses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleRowClick = (warehouse) => {
    onWarehouseSelect(warehouse);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h5" component="h2" sx={{ p: 2, fontWeight: 'bold' }}>
        Danh sách kho hàng
      </Typography>
      
      <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          select
          label="Tìm kiếm theo"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          size="small"
          sx={{ width: 180 }}
        >
          <MenuItem value="nameOfProduct">Tên sản phẩm</MenuItem>
          <MenuItem value="idProduct">Mã sản phẩm</MenuItem>
          <MenuItem value="quantity">Số lượng</MenuItem>
          <MenuItem value="idProvider">Mã nhà cung cấp</MenuItem>
          <MenuItem value="nameOfProvider">Tên nhà cung cấp</MenuItem>
        </TextField>
      </Box>

      <TableContainer sx={{ maxHeight: 440, overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã SP</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell>Mã nhà cung cấp</TableCell>
              <TableCell>Tên nhà cung cấp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.length > 0 ? (
              currentPageData.map((warehouse, index) => (
                <TableRow 
                  key={index} 
                  hover 
                  onClick={() => handleRowClick(warehouse)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>{warehouse.idProduct}</TableCell>
                  <TableCell>{warehouse.nameOfProduct}</TableCell>
                  <TableCell align="right">{warehouse.quantity}</TableCell>
                  <TableCell>{warehouse.idProvider}</TableCell>
                  <TableCell>{warehouse.nameOfProvider}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Không tìm thấy kho hàng
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredWarehouses.length} // Total filtered items
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </Paper>
  );
};

export default WarehouseTable;
