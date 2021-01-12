import React, {useEffect, useState} from 'react';
import Layout from './../core/Layout';
import {isAuthenticated} from '../auth';
import Banner from './../core/Banner';
import {createProduct, getCategories} from './apiAdmin'

const AddProduct = () => {
  
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  })

  const {
    name,
    description,
    price,
    categories,
    category,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  const {user, token} = isAuthenticated();

  const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, categories: data, formData: new FormData()})
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
};

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: '', loading: true});

    createProduct(user._id, token, formData)
      .then(data => {
        if(data.error) {
          setValues({...values, error: data.error})
        } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          photo: '',
          loading: false,
          createdProduct: data.name
        })
      }
    })
  }

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>


      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input type="text" className="form-control" onChange={handleChange('name')} value={name} />        
      </div>

      <div className="form-group">
        <label className="text-muted">description</label>
        <input onChange={handleChange('description')} type="text" className="form-control" value={description} />
      </div>
      
      <div className="form-group">
        <label className="text-muted"> Price </label>
        <input type="text" className="form-control" onChange={handleChange('price')} value={price} />        
      </div>

      <div className="form-group">
        <label className="text-muted"> Category </label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Selecione uma opção</option>
          {
            categories && categories.map((c,i) => (
              <option key={i} value={c._id}> {c.name} </option>
            ))
          }
        </select>     
      </div>

      <button className="btn btn-primary">Create Product</button>
    </form>
  )

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
  );

  const showSuccess = () => (
      <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
          <h2>{`${createdProduct}`} is created!</h2>
      </div>
  );

  const showLoading = () => loading && (
      <div className="alert alert-success">
          <h2>Loading...</h2>
      </div>
  );


  return (
    <Layout>
      <Banner title="Create Product page"/>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-5">
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newPostForm()}
          </div>
      </div>
      </div>
    </Layout>
  );
}

export default AddProduct;
