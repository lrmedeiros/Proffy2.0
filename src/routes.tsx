import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Register from './pages/Register';
import Home from './pages/Home';
import Success from './pages/Success';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Login} path="/login" />
      <Route component={Register} path="/register" />
      <Route component={Success} path="/success" />
      <Route component={ForgotPassword} path="/forgot-password" />
    </BrowserRouter>
  );
};

export default Routes;
