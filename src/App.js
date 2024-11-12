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
import ProductManagement from "./Pages/Admin/ProductManagement/ProductManagement";
import ProviderManagement from "./Pages/Admin/ProviderManagement/ProviderManagement";
import WarehouseManagement from "./Pages/Admin/WarehouseManagement/WarehouseManagement";
import OrderManagement from "./Pages/Admin/OrderManagement/OrderManagement";
import ImportManagement from "./Pages/Admin/ImportManagement/ImportManagement";
import CartPage from "./Pages/Cart/CartPage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import ProductListing from "./Pages/Product/ProductListing";
import VerificationSuccess from "./Pages/VertificationSuccess";
import OrderPending from "./Pages/Checkout/OderPending";
import BankTransferQRCode from "./Pages/Checkout/BankTransferQRCode";

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

          <Route path="/ProductManagement" element={<ProductManagement/>}/>
          <Route path="/ProviderManagement" element={<ProviderManagement/>}/>
          <Route path="/WarehouseManagement" element={<WarehouseManagement/>}/>
          <Route path="/OrderManagement" element={<OrderManagement/>}/>
          <Route path="/ImportManagement" element={<ImportManagement/>}/>


          <Route path ="/CartPage" element = {<CartPage/>}/>
          <Route path ="/CheckoutPage" element = {<CheckoutPage/>}/>


          <Route path = "/products/:type" element = {<ProductListing/>} />
          <Route path = "/info" element = {<InfoUser/>}/>
          <Route path = "/order-pending" element = {<OrderPending/>} />
          <Route path="/bank-transfer-qr-code" element={<BankTransferQRCode />} />
          {/* <Route 
            path="/info" 
            element={
              <ProtectedRoute role={role} allowedRoles={['admin', 'user']}>
                <InfoUser />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/product/:id" element={<ProductDetail/>}/>

          {/* <Route 
            path="/product/:id" 
            element={
              <ProtectedRoute role={role} allowedRoles={['user', 'admin']}>
                <ProductDetail />
              </ProtectedRoute>
            }
          /> */}
          <Route 
            path="/nav" 
            element={
              <ProtectedRoute role={role} allowedRoles={['admin']}>
                <SideNav />
              </ProtectedRoute>
            }
          />
          
          {/* Route cho trang 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} /> {/* Định tuyến tất cả các URL không khớp */}
          <Route path="/verification-success" element={<VerificationSuccess/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;