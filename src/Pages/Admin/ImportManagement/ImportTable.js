import React, { useState } from 'react';
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
  TablePagination
} from '@mui/material';

const ImportTable = ({ imports, onImportSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameOfProduct');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm và trường tìm kiếm
  const filteredImports = imports.filter((importItem) => {
    // Lọc theo searchBy
    let isMatch = importItem[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase());

    // Nếu tìm kiếm theo giá, lọc thêm theo khoảng giá
    if (searchBy === 'priceImport') {
      const price = parseFloat(importItem.priceImport);
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      isMatch = isMatch && price >= min && price <= max;
    }

    return isMatch;
  });

  // Xử lý khi nhấn vào một hàng trong bảng
  const handleRowClick = (importItem) => {
    onImportSelect(importItem);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h5" component="h2" sx={{ p: 2, fontWeight: 'bold' }}>
        Danh sách nhập hàng
      </Typography>

      {/* Thanh tìm kiếm */}
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
          <MenuItem value="idProduct">Mã sản phẩm</MenuItem>
          <MenuItem value="nameOfProduct">Tên sản phẩm</MenuItem>
          <MenuItem value="priceImport">Giá nhập</MenuItem>
          <MenuItem value="idProvider">Mã nhà cung cấp</MenuItem>
          <MenuItem value="nameOfProvider">Tên nhà cung cấp</MenuItem>
        </TextField>
        
        {/* Nếu tìm kiếm theo giá, thêm input cho khoảng giá */}
        {searchBy === 'priceImport' && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="Min Price"
              variant="outlined"
              size="small"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              type="number"
              sx={{ width: 120 }}
            />
            <TextField
              label="Max Price"
              variant="outlined"
              size="small"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              type="number"
              sx={{ width: 120 }}
            />
          </Box>
        )}
      </Box>

      {/* Hiển thị khi không có kết quả tìm kiếm */}
      {filteredImports.length === 0 && (
        <Typography variant="body2" color="error" sx={{ textAlign: 'center', p: 2 }}>
          Không tìm thấy kết quả
        </Typography>
      )}

      {/* Bảng dữ liệu */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: 120, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                ID nhập
              </TableCell>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá nhập</TableCell>
              <TableCell>Mã nhà cung cấp</TableCell>
              <TableCell>Tên nhà cung cấp</TableCell>
              <TableCell>Ngày nhập</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredImports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((importItem, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={() => handleRowClick(importItem)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell
                    sx={{
                      maxWidth: 120,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {importItem._id}
                  </TableCell>
                  <TableCell>{importItem.idProduct}</TableCell>
                  <TableCell>{importItem.nameOfProduct}</TableCell>
                  <TableCell align="right">{importItem.quantity}</TableCell>
                  <TableCell align="right">{importItem.priceImport}</TableCell>
                  <TableCell>{importItem.idProvider}</TableCell>
                  <TableCell>{importItem.nameOfProvider || 'N/A'}</TableCell>
                  <TableCell>
                    {importItem.dateImport ? new Date(importItem.dateImport).toLocaleDateString() : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredImports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </Paper>
  );
};

export default ImportTable;
