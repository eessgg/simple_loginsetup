import React from 'react';
import Layout from './../core/Layout';
import './UserDashboar.css';
import Banner from './../core/Banner';
import {isAuthenticated} from '../auth'
import {FaUserCircle, FaEnvelope, FaAddressCard} from 'react-icons/fa';
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
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li className="list-group-item">
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
        <ul className="list-group">
          <li className="list-group-item">
            <FaUserCircle/>
            <strong>Name: </strong> {username}
          </li>
          <li className="list-group-item">
            <FaEnvelope/>
            <strong>Email:</strong> {email}
          </li>
          <li className="list-group-item">
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

      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 col-sm-12 col-lg-3">
            {userInfo()}
          </div>

          <main role="main" className="col-md-9 col-sm-12 col-lg-9">
            {userLinks()}
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default UserDashboard;
