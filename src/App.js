import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from './Pages/Account/LogIn';
import SignUp from "./Pages/Account/SignUp";
import Header from "./Header";
import HomePage from "./Pages/HomePage/HomePage";
import ForgetPassWord from "./Pages/Account/ForgetPassword";
import ProductDetail from "./Pages/Product/ProductDetail";
import InfoUser from "./Pages/Account/InfoUser";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./Pages/NotFound"; // Import trang NotFound
import SideNav from "./Pages/Admin/SideNav";
import CartPage from "./Pages/Cart/CartPage";
import ProductManagement from "./Pages/Admin/ProductManagement/ProductManagement";
import ProviderManagement from "./Pages/Admin/ProviderManagement/ProviderManagement";
import WarehouseManagement from "./Pages/Admin/WarehouseManagement/WarehouseManagement";

function App() {
  const role = JSON.parse(localStorage.getItem('user'))?.role;
  
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/ForgetPassword" element={<ForgetPassWord />} />
          <Route path="/ProductManagement" element={
              <ProtectedRoute role={role} allowedRoles={['admin']}>
                <ProductManagement />
              </ProtectedRoute>
            }/>
          <Route path="/ProviderManagement" element={
              <ProtectedRoute role={role} allowedRoles={['admin']}>
                <ProviderManagement />
              </ProtectedRoute>
            }/>
          <Route path="/WarehouseManagement" element={
              <ProtectedRoute role={role} allowedRoles={['admin']}>
                <WarehouseManagement />
              </ProtectedRoute>
            }/>
          <Route 
            path="/info" 
            element={
              <ProtectedRoute role={role} allowedRoles={['admin', 'user']}>
                <InfoUser />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/product/:id" 
            element={
              <ProtectedRoute role={role} allowedRoles={['user']}>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/nav" 
            element={
              <ProtectedRoute role={role} allowedRoles={['admin']}>
                <SideNav />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute role={role} allowedRoles={['user']}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          
          {/* Route cho trang 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} /> {/* Định tuyến tất cả các URL không khớp */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
