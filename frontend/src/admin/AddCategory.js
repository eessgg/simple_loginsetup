import React, {useState} from 'react';
import Layout from './../core/Layout';
import {isAuthenticated} from '../auth';
import Banner from './../core/Banner';

import {createCategory} from './apiAdmin.js'

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("")
    setName(e.target.value)
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, {name})
      .then(data => {
        if(data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
        }
      })
  }

  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Categoria</label>
        <input type="text" className="form-control mt-1" autoFocus onChange={handleChange} value={name} />
        <button className="btn btn-primary mt-3">
          Criar Categoria
        </button>
      </div>
    </form>
    )
  }

  
  const showError = () => {
    if(error) {
      return <h3 className="text-danger"> {name} deu erro</h3>
    }
  }

  const showSuccess = () => {
    if(success) {
      return <h3 className="text-success"> {name} foi criado</h3>
    }
  }


  return (
    <Layout>
      <Banner title="Create Category page"/>
        <div className="row mt-5">
          <div className="container col-md-5">
            {newCategoryForm()}
            {showError()}
            {showSuccess()}
          </div> 
      </div>
    </Layout>
  );
}

export default AddCategory;
