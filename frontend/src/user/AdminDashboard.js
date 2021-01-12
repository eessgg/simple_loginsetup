import React from 'react';
import Layout from './../core/Layout';
import './UserDashboar.css';
import Banner from './../core/Banner';
import {isAuthenticated} from '../auth'
import {FaUserCircle, FaEnvelope, FaAddressCard} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const AdminDashboard = () => {
  const {
    user: {
      _id,
      username,
      email,
      role
    }
  } = isAuthenticated()

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/category/create">Create Category</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/product/create">Create product</Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <FaUserCircle/>
            <strong> Name: </strong> {username} </li>
          <li className="list-group-item">
            <FaEnvelope/><strong> Email: </strong> {email} </li>
          <li className="list-group-item">
          <FaAddressCard/>  
            <strong> Role: </strong>
              {role === 1 ? "Admin" : "Registerd User"}
          </li>
        </ul>
      </div>
    )
  }

  return (
    <Layout>
      <Banner title="Admin Dashboard"/>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 col-sm-12 col-lg-3">
            {adminInfo()}
          </div>

          <main role="main" className="col-md-9 col-sm-12 col-lg-9">
            {adminLinks()}
          </main>
        </div>

      </div>
      <div className="container  my-5">
        <div className="row">
          aASDDDDASD
        </div>
      
      </div>
    </Layout>
  );
}

export default AdminDashboard;
