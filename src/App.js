import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from './Pages/Account/LogIn';
import SignIn from "./Pages/Account/SignIn";
import Header from "./Header";
import HomePage from "./Pages/HomePage/HomePage";
import ForgetPassWord from "./Pages/Account/ForgetPassword";
import ProductDetail from "./Pages/Product/ProductDetail";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>  
          <Route index element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/ForgetPassword" element={<ForgetPassWord />} />
          
          {/* Update this route to include the product id as a parameter */}
          <Route path="/product/:id" element={<ProductDetail />} />  
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
