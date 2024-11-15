import React, { useState, useEffect } from 'react';
import clientAPI from '../../../client-api/rest-client';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, TablePagination, Box, TextField, MenuItem
} from '@mui/material';

const AccountTable = ({ onAccountSelect }) => {
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('email');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await clientAPI.service('account').find();
        setAccounts(response.data || []);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setError('Failed to fetch accounts.');
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  // Check if accounts is an array before filtering
  const filteredAccounts = accounts.filter(account =>
    account[searchBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h5" component="h2" sx={{ p: 2, fontWeight: 'bold' }}>
        Account List
      </Typography>

      {loading ? (
        <Box sx={{ p: 2 }}>Loading...</Box> 
      ) : error ? (
        <Box sx={{ p: 2, color: 'red' }}>{error}</Box> 
      ) : (
        <>
          <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              select
              label="Search by"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              size="small"
              sx={{ width: 180 }}
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="username">Username</MenuItem>
              <MenuItem value="role">Role</MenuItem>
              <MenuItem value="isActive">Is Active</MenuItem>
            </TextField>
          </Box>

          <TableContainer sx={{ maxHeight: 440, overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell> {/* New Column Header */}
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Quyền</TableCell>
                <TableCell>trạng thái</TableCell>
                <TableCell>Mật khẩu</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAccounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((account) => (
                <TableRow
                  key={account._id}
                  hover
                  onClick={() => onAccountSelect(account)}
                  style={{ cursor: 'pointer' }} 
                >
                  <TableCell>{account._id}</TableCell> {/* Display _id */}
                  <TableCell>{account.username}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.role}</TableCell>
                  <TableCell>{account.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>{'******'}</TableCell> {/* Mask password */}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredAccounts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </>
      )}
    </Paper>
  );
};

export default AccountTable;
