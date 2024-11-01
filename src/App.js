import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from './Pages/Account/LogIn';
import SignUp from "./Pages/Account/SignUp";
import Header from "./Header";
import HomePage from "./Pages/HomePage/HomePage";
import ForgetPassWord from "./Pages/Account/ForgetPassword";
import ProductDetail from "./Pages/Product/ProductDetail";
import InfoUser from "./Pages/Account/InfoUser";

function App() {
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
          <Route path="/info" element={<InfoUser/>}/>
          {/* Update this route to include the product id as a parameter */}
          <Route path="/product/:id" element={<ProductDetail />} />  
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
