import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index'

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
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          <Link className="navbar-brand mb-2 mb-lg-0" to="/">
            Simple Login
          </Link>
          <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-3">
              <li className="nav-item4">
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
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0 d-flex">
              {
              isAuthenticated() && (
                <li className="nav-item mr-auto">
                  <span className="nav-link btn btn-warning text-dark"
                    style={
                      {
                        cursor: "pointer",
                        color: "#ffffff"
                      }
                    }
                    onClick={
                      () => signout(() => {
                        history.push("/");
                      })
                  }>
                    Logout
                  </span>
                </li>
              )
            } </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Menu);
