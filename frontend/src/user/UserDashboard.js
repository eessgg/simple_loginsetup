import React from 'react';
import Layout from './../core/Layout';
import './UserDashboar.css';
import Banner from './../core/Banner';
import {isAuthenticated} from '../auth'
import {FaUserCircle, FaEnvelope, FaAddressCard, FaRegStickyNote} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const UserDashboard = () => {
  const {
    user: {
      _id,
      username,
      email,
      role
    }
  } = isAuthenticated()

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul class="list-group">
          <li class="list-group-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li class="list-group-item">
            <Link className="nav-link" to="/profile/update">Update Profile</Link>
          </li>
        </ul>
      </div>
    )
  }

  const userInfo = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Info</h4>
        <ul class="list-group">
          <li class="list-group-item">
            <FaUserCircle/>
            <strong>Name: </strong> {username}
          </li>
          <li class="list-group-item">
            <FaEnvelope/>
            <strong>Email:</strong> {email}
          </li>
          <li class="list-group-item">
            <FaAddressCard/> <strong>Role:</strong>
            {role === 1 ? "Admin" : "Registerd User"}
          </li>
        </ul>
      </div>
    )
  }

  return (
    <Layout>
      <Banner title="User Dashboard"/>

      <div class="container-fluid my-5">
        <div class="row">
          <div class="col-md-3 col-sm-12 col-lg-3">
            {
            userLinks()
          } </div>

          <main role="main" class="col-md-9 col-sm-12 col-lg-9">
            {
            userInfo()
          } </main>
        </div>
      </div>
    </Layout>
  );
}

export default UserDashboard;
