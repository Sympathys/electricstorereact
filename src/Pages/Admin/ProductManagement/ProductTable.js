import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, TablePagination, Box, Chip, TextField, MenuItem
} from '@mui/material';

const ProductTable = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('nameOfProduct');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await clientAPI.service('product').find();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriceRange = 
      (!minPrice || product.price >= minPrice) && 
      (!maxPrice || product.price <= maxPrice);
    return matchesSearchTerm && matchesPriceRange;
  });

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND'
  }).format(price);

  const getStatusLabel = (status) => {
    return status === 'Available' ? 'Còn hàng' : 'Hết hàng';
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h5" component="h2" sx={{ p: 2, fontWeight: 'bold' }}>
        Danh sách sản phẩm
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
          <MenuItem value="typeProduct">Loại sản phẩm</MenuItem>
          <MenuItem value="price">Giá</MenuItem>
          <MenuItem value="idProduct">Mã sản phẩm</MenuItem> {/* Added product code option */}
          <MenuItem value="status">Trạng thái</MenuItem> {/* Added status option */}
        </TextField>

        {/* Price Range Inputs */}
        {searchBy === 'price' && (
          <>
            <TextField
              label="Giá tối thiểu"
              variant="outlined"
              size="small"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              sx={{ width: 180 }}
            />
            <TextField
              label="Giá tối đa"
              variant="outlined"
              size="small"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              sx={{ width: 180 }}
            />
          </>
        )}
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mã SP</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => (
              <TableRow key={product.idProduct} hover onClick={() => onProductSelect(product)}>
                <TableCell>{product.idProduct}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {product.nameOfProduct}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {product.description?.slice(0, 100)}{product.description?.length > 100 ? '...' : ''}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{product.typeProduct}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">{formatPrice(product.price)}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={getStatusLabel(product.status)}
                    color={product.status === 'Available' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </Paper>
  );
};

export default ProductTable;
