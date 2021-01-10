import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import UserDashboard from './user/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import AdminDashboard from './user/AdminDashboard';
import AdminRoute from './auth/AdminRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Signup} />
        <Route path="/login" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;