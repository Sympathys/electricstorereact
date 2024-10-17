import React from 'react';
import ReactDOM from 'react-dom/client';
import Counter from './Counter';
import Header from './Header';
import LogIn from './Pages/Account/LogIn';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <LogIn></LogIn>

  </div>
);