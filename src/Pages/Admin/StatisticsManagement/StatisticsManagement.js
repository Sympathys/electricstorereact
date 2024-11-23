import React, { useState, useEffect } from 'react';
import SideNav from '../SideNav';
import clientAPI from '../../../client-api/rest-client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, TextField, TablePagination, Button, TableFooter } from '@mui/material'; // Thêm TableFooter

const StatisticsManagement = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);
  const [importData, setImportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showTable, setShowTable] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(false);
  const [showLowStockProducts, setShowLowStockProducts] = useState(false);
  const [showCustomerOrders, setShowCustomerOrders] = useState(false);
  const [showImportTotal, setShowImportTotal] = useState(false);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customerStartDate, setCustomerStartDate] = useState('');
  const [customerEndDate, setCustomerEndDate] = useState('');
  const [importStartDate, setImportStartDate] = useState('');
  const [importEndDate, setImportEndDate] = useState('');

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [orderResponse, warehouseResponse, importResponse] = await Promise.all([ 
        clientAPI.service('order').find(), 
        clientAPI.service('warehouse').find(),
        clientAPI.service('import').find()
      ]);

      // Lọc đơn hàng theo ngày
      const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
      const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

      const filteredOrders = orderResponse.data.filter(order => {
        const orderDate = new Date(order.dateOrder);
        return order.isPayment && (!start || orderDate >= start) && (!end || orderDate <= end);
      });

      const ordersWithProducts = filteredOrders.map(order => ({
        products: order.products.map(({ nameOfProduct, quantity, price }) => ({ nameOfProduct, quantity, price }))
      }));

      setOrders(ordersWithProducts);
      setWarehouseData(warehouseResponse.data);

      // Lọc thông tin khách hàng theo ngày
      const customerFilteredOrders = orderResponse.data.filter(order => {
        const orderDate = new Date(order.dateOrder);
        return order.isPayment && (!customerStartDate || orderDate >= new Date(customerStartDate).setHours(0, 0, 0, 0)) && (!customerEndDate || orderDate <= new Date(customerEndDate).setHours(23, 59, 59, 999));
      });

      const customerData = customerFilteredOrders.reduce((acc, order) => {
        if (!acc[order.idCustomer]) {
          acc[order.idCustomer] = { nameOfCustomer: order.nameOfCustomer, phone: order.phone, ordersCount: 0 };
        }
        acc[order.idCustomer].ordersCount += 1;
        return acc;
      }, {});

      setCustomerOrders(Object.values(customerData));

      // Lọc dữ liệu nhập theo ngày
      const importFilteredData = importResponse.data.filter(entry => {
        const importDate = new Date(entry.dateImport);
        return (!importStartDate || importDate >= new Date(importStartDate).setHours(0, 0, 0, 0)) && (!importEndDate || importDate <= new Date(importEndDate).setHours(23, 59, 59, 999));
      });

      const importDataWithTotal = importFilteredData.map(entry => ({
        ...entry,
        totalPrice: entry.quantity * entry.priceImport
      }));

      setImportData(importDataWithTotal);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Unable to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, customerStartDate, customerEndDate, importStartDate, importEndDate]);

  const handleSearch = e => setSearchTerm(e.target.value);
  const handlePageChange = (e, newPage) => setPage(newPage);
  const handleRowsPerPageChange = e => setRowsPerPage(parseInt(e.target.value, 10));

  const groupAndSummarizeProducts = (orders, warehouseData) => {
    const productSummary = {};

    orders.forEach(({ products }) => {
      products.forEach(({ nameOfProduct, quantity, price }) => {
        if (!productSummary[nameOfProduct]) {
          productSummary[nameOfProduct] = { nameOfProduct, quantity: 0, totalPrice: 0 };
        }
        productSummary[nameOfProduct].quantity += quantity;
        productSummary[nameOfProduct].totalPrice += quantity * price;
      });
    });

    warehouseData.forEach(({ nameOfProduct }) => {
      if (!productSummary[nameOfProduct]) {
        productSummary[nameOfProduct] = { nameOfProduct, quantity: 0, totalPrice: 0 };
      }
    });

    return Object.values(productSummary);
  };

  const filteredOrders = groupAndSummarizeProducts(orders, warehouseData)
    .filter(product => product.nameOfProduct.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.quantity - a.quantity);

  const topSellingProducts = filteredOrders.filter(product => product.quantity === filteredOrders[0]?.quantity);

  const lowStockProducts = filteredOrders.filter(product => product.quantity === filteredOrders[filteredOrders.length - 1]?.quantity);

  const totalImportPrice = importData.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="flex h-screen">
      <SideNav isOpen={isMenuOpen} toggleSidebar={toggleMenu} />
      <div className={`bg-white border-r shadow-md h-screen ${isMenuOpen ? 'w-80' : 'w-10'} relative`}>
        <button onClick={toggleMenu} className="absolute top-266 -right-0 transform -translate-y-1/2 bg-gray-200 p-1 rounded-full hover:bg-gray-300">
          {isMenuOpen ? '<' : '>'}
        </button>
        {isMenuOpen && (
          <div className="p-4">
            <button onClick={() => { setShowTable(true); setShowTopProducts(false); setShowLowStockProducts(false); setShowCustomerOrders(false); setShowImportTotal(false); }} className="w-full bg-pink-500 text-white p-2 rounded-md hover:bg-pink-600 transition">
              Thống kê sản phẩm đã bán
            </button>
            <button onClick={() => { setShowTopProducts(true); setShowTable(false); setShowLowStockProducts(false); setShowCustomerOrders(false); setShowImportTotal(false); }} className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition mt-2">
              Sản phẩm bán chạy nhất
            </button>
            <button onClick={() => { setShowLowStockProducts(true); setShowTable(false); setShowTopProducts(false); setShowCustomerOrders(false); setShowImportTotal(false); }} className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition mt-2">
              Sản phẩm bán được ít
            </button>
            <button onClick={() => { setShowCustomerOrders(true); setShowTable(false); setShowTopProducts(false); setShowLowStockProducts(false); setShowImportTotal(false); }} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition mt-2">
              Lượt mua của khách hàng
            </button>
            <button onClick={() => { setShowImportTotal(true); setShowTable(false); setShowTopProducts(false); setShowLowStockProducts(false); setShowCustomerOrders(false); }} className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition mt-2">
              Tổng đơn nhập
            </button>
          </div>
        )}
      </div>
      <div className={`flex-1 h-full px-4 transition-all ${isMenuOpen ? 'ml-180' : 'ml-1'} ${isMenuOpen ? 'pl-10' : 'pl-4'}`}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : showCustomerOrders ? (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h5" component="h2" sx={{ p: 2, fontWeight: 'bold' }}>
              Lượt mua của khách hàng
              </Typography>
            <Box sx={{ p: 2 }} display="flex" justifyContent="space-between">
              <Box>
                <TextField label="Từ ngày" variant="outlined" type="date" value={customerStartDate} onChange={e => setCustomerStartDate(e.target.value)} sx={{ marginRight: 2 }} InputLabelProps={{ shrink: true }} />
                <TextField label="Đến ngày" variant="outlined" type="date" value={customerEndDate} onChange={e => setCustomerEndDate(e.target.value)} sx={{ marginRight: 2 }} InputLabelProps={{ shrink: true }} />
              </Box>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Khách Hàng</TableCell>
                    <TableCell>Số Điện Thoại</TableCell>
                    <TableCell>Số Đơn Hàng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ nameOfCustomer, phone, ordersCount }) => (
                    <TableRow key={nameOfCustomer}>
                      <TableCell>{nameOfCustomer}</TableCell>
                      <TableCell>{phone}</TableCell>
                      <TableCell>{ordersCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={customerOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Paper>
        ) : showImportTotal ? (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h5" component="h2" sx={{ p: 2, fontWeight: 'bold' }}>
              Tổng đơn nhập
            </Typography>
            <Box sx={{ p: 2 }} display="flex" justifyContent="space-between">
              <Box>
                <TextField label="Từ ngày" variant="outlined" type="date" value={importStartDate} onChange={e => setImportStartDate(e.target.value)} sx={{ marginRight: 2 }} InputLabelProps={{ shrink: true }} />
                <TextField label="Đến ngày" variant="outlined" type="date" value={importEndDate} onChange={e => setImportEndDate(e.target.value)} sx={{ marginRight: 2 }} InputLabelProps={{ shrink: true }} />
              </Box>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Sản Phẩm</TableCell>
                    <TableCell>Số Lượng</TableCell>
                    <TableCell>Giá Nhập</TableCell>
                    <TableCell>Tổng Giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {importData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ nameOfProduct, quantity, priceImport, totalPrice }) => (
                    <TableRow key={nameOfProduct}>
                      <TableCell>{nameOfProduct}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>{priceImport.toLocaleString()} VND</TableCell>
                      <TableCell>{totalPrice.toLocaleString()} VND</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                  <TableCell colSpan={3} style={{ fontSize: '1rem', textAlign: 'left' }}>
                    <strong>Tổng giá toàn bộ sản phẩm nhập</strong>
                  </TableCell>
                    <TableCell style={{ fontSize: '1rem', textAlign: 'left' }}>
                      <strong>{totalImportPrice.toLocaleString()} VND</strong></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={importData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Paper>
        ) : (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h5" component="h2" sx={{ p: 2, fontWeight: 'bold' }}>
              Danh sách lượt bán sản phẩm
            </Typography>
            <Box sx={{ p: 2 }} display="flex" justifyContent="space-between">
              <Box>
                <TextField label="Từ ngày" variant="outlined" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} sx={{ marginRight: 2 }} InputLabelProps={{ shrink: true }} />
                <TextField label="Đến ngày" variant="outlined" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} sx={{ marginRight: 2 }} InputLabelProps={{ shrink: true }} />
              </Box>
              <TextField label="Tìm kiếm sản phẩm" variant="outlined" size="small" value={searchTerm} onChange={handleSearch} sx={{ flex: 1 }} />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Sản Phẩm</TableCell>
                    <TableCell>Số Lượng</TableCell>
                    <TableCell>Tổng giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(showTable ? filteredOrders : showTopProducts ? topSellingProducts : lowStockProducts).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ nameOfProduct, quantity, totalPrice }) => (
                    <TableRow key={nameOfProduct}>
                      <TableCell>{nameOfProduct}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>{totalPrice.toLocaleString()} VND</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={(showTable ? filteredOrders.length : showTopProducts ? topSellingProducts.length : lowStockProducts.length)}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Paper>
        )}
      </div>
    </div>
  );
};

export default StatisticsManagement;

