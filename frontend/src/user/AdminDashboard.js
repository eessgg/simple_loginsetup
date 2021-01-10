import React from 'react';
import Layout from './../core/Layout';
import './UserDashboar.css';
import Banner from './../core/Banner';
import {isAuthenticated} from '../auth'
import {FaUserCircle, FaEnvelope, FaAddressCard, FaRegStickyNote} from 'react-icons/fa';
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
        <ul class="list-group">
          <li class="list-group-item">
            <Link className="nav-link" to="/create/category">Create Category</Link>
          </li>
          <li class="list-group-item">
            <Link className="nav-link" to="/create/product">Create product</Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Info</h4>
        <ul class="list-group">
          <li class="list-group-item">
            <FaUserCircle/>
            <strong>Name:</strong>
            {username} </li>
          <li class="list-group-item">
            <FaEnvelope/>
            <strong>
              Email:
            </strong>
            {email} </li>
          <li class="list-group-item">
            <FaAddressCard/>
            <strong>
              Role:
            </strong>
            {
            role === 1 ? "Admin" : "Registerd User"
          } </li>
        </ul>
      </div>
    )
  }

  return (
    <Layout>
      <Banner title="Admin Dashboard"/>

      <div class="container-fluid my-5">
        <div class="row">
          <div class="col-md-3 col-sm-12 col-lg-3">
            {
            adminLinks()
          } </div>

          <main role="main" class="col-md-9 col-sm-12 col-lg-9">
            {adminInfo()}
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
