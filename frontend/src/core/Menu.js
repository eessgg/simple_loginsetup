import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index'
import {FaAppleAlt} from 'react-icons/fa'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {color: '#ff9900'};
  } else {
    return {color: '#ffffff'}
  }
}

const Menu = ({history}) => {
  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <Link class="navbar-brand mb-2 mb-lg-0" to="/">
            Simple Login
          </Link>
          <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarText">

            <ul class="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-dark"
                  style={
                    isActive(history, "/")
                  }
                  to="/">
                  Home
                </Link>
              </li>

              {
              isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                  <Link className="nav-link text-dark"
                    style={
                      isActive(history, '/admin/dashboard')
                    }
                    to="/admin/dashboard">
                    Dashboard
                  </Link>
                </li>
              )
            }

              {
              isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                  <Link className="nav-link text-dark"
                    style={
                      isActive(history, '/user/dashboard')
                    }
                    to="/user/dashboard">
                    Dashboard
                  </Link>
                </li>
              )
            }
              {
              !isAuthenticated() && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark"
                      style={
                        isActive(history, "/login")
                      }
                      to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link text-dark"
                      style={
                        isActive(history, "/register")
                      }
                      to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )
            } </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Menu);
