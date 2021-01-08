import React, {useState} from 'react';
// import {API} from '../config';
// import axios from 'axios';
import {signin, authenticate} from '../auth/index'
import {Link, Redirect} from 'react-router-dom'

const Signup = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  })

  const { email, password, error, loading, redirectToReferrer } = values;

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
      <button className="btn btn-dark"
        onClick={clickSubmit}>Submit</button>
    </form>
  )

  return (
    <div className="container mt-5 col-md-5">
      <h1>
        Login
      </h1>
      {showLoading()}
      {showError()}
      {signForm()}
      {redirectUser()}
    </div>
  );
}

export default Signup;
