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
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="/">App Login</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
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
        }
          {
          isAuthenticated() && (
            <li className="nav-item">
              <span className="nav-link  text-dark"
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
                Signout
              </span>
            </li>
          )
        } </ul>
      </div>
    </nav>
  );
}

export default withRouter(Menu);
