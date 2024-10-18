import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from './Pages/Account/LogIn';
import SignIn from "./Pages/Account/SignIn";
import Header from "./Header";
import HomePage from "./Pages/HomePage/HomePage";
import ForgetPassWord from "./Pages/Account/ForgetPassword";

function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <Routes>  
          <Route index element={<HomePage />}></Route>
          <Route path="/HomePage" element = {<HomePage/>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/ForgetPassword" element={<ForgetPassWord/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
