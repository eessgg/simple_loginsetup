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
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link className="nav-link text-light"
            style={
              isActive(history, '/')
            }
            to="/">
            Home
          </Link>
        </li>
        {
        !isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link className="nav-link"
                style={
                  isActive(history, "/login")
                }
                to="/login">
                login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link"
                style={
                  isActive(history, "/register")
                }
                to="/register">
                register
              </Link>
            </li>
          </>
        )
      }
        {
        isAuthenticated() && (
          <li className="nav-item">
            <span className="nav-link"
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
  );
}

export default withRouter(Menu);
