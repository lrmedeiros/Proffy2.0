import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Register from './pages/Register';
import Home from './pages/Home';
import Success from './pages/Success';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Register} path="/register" />
      <Route component={Success} path="/success" />
    </BrowserRouter>
  );
};

export default Routes;
