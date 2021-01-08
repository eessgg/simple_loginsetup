import React, {useState} from 'react';
// import {API} from '../config';
// import axios from 'axios';
import {signup} from '../auth/index'

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const {username, email, password, error, success} = values;

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    });
  }

  const clickSubmit = (event) => {
    event.preventDefault()

    setValues({...values,error: false})

    signup({username, email, password}).then(data => {
        if(data.error) {
          setValues({...values, error: data.error, success:false})
        } else {
          setValues({
            ...values,
            username: '',
            email: '',
            password: '',
            error: '',
            success: true
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
      New Account
    </div>
  )  

  const signForm = () => (
    <form>
      <div className="form-group mt-5">
        <label htmlFor="username">Name</label>
        <input onChange={
            handleChange('username')
          }
          type="text"
          name="username"
          className="form-control"
          value={username}
        />
      </div>
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
      <h1>SignUp</h1>
      {showSuccess()}
      {showError()}
      {signForm()}
    </div>
  );
}

export default Signup;
