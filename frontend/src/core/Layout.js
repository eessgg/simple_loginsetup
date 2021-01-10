import React from 'react';
import Menu from '../core/Menu';

import './Layout.css'

const Layout = ({children}) => {
  return (
    <div className="layout-container">
      <Menu />
      <div className="container">{children} </div>
    </div>
  );
}

export default Layout;
