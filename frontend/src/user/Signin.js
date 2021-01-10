import React, {useState} from 'react';
// import {API} from '../config';
// import axios from 'axios';
import {signin, authenticate, isAuthenticated} from '../auth/index'
import {Redirect} from 'react-router-dom'

import Banner from './../core/Banner';

import Layout from '../core/Layout.js';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  })

  const { email, password, error, loading, redirectToReferrer } = values;
  const {user} = isAuthenticated()

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    });
  }

  const clickSubmit = (event) => {
    event.preventDefault()

    setValues({...values, error: false, loading: true});

    signin({ email, password })
    .then(data => {
        if(data.error) {
          setValues({...values, error: data.error, loading:false})
        } else {
            authenticate(data, () =>{
              setValues({
                ...values,
                redirectToReferrer: true
              })
            })
        }
    })
  }

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  const showLoading = () => (
    loading && (<div className="alert alert-info">
      <h2>Loading...</h2>
    </div>)
  )

  const redirectUser = () => {
    if(redirectToReferrer) {
      if(user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
    if(isAuthenticated()) {
      return <Redirect to="/" />
    }
  }

  const signForm = () => (
    <form>
      <div className="form-group mt-5">
        <label htmlFor="email">Email</label>
        <input onChange={
            handleChange('email')
          }
          type="email"
          name="email"
          className="form-control"
          value={email}
          />
      </div>
      <div className="form-group mt-5">
        <label htmlFor="password">Password</label>
        <input onChange={
            handleChange('password')
          }
          name="password"
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button className="btn btn-dark btn-lg my-3"  type="button"
        onClick={clickSubmit}>Submit</button>
    </form>
  )

  return (
    <Layout>
      <Banner title="Login Dashboard" description="Login page for my app." />
      <div className="container col-md-5">
        {showLoading()}
        {showError()}
        {signForm()}
        {redirectUser()}
      </div>
    </Layout>
  );
}

export default Signin;
