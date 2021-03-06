import React, {useState} from 'react';
// import {API} from '../config';
import {signup} from '../auth/index'
import Banner from './../core/Banner';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      Novo usuário cadastrado. Faça o <Link to="/login">login</Link> aqui
      {() => toast.success('Mensagem de sucesso')}
      <ToastContainer />
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
      <button className="btn btn-secondary btn-lg my-3"  type="button"
      onClick={clickSubmit}>Submit</button>
    </form>
  )

  return (
    <Layout>
      <Banner title="Signup Dashboard" description="Signup page for my app." />

      <div className="container mt-5 col-md-5">
        {showSuccess()}
        {showError()}
        {signForm()}
      </div>
    </Layout>
  );
}

export default Signup;
