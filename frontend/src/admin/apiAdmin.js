const createCategory = (userId, token, category) => {
  return fetch(`http://localhost:5000/api/category/create/${userId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
  .then(response => response.json())
  .catch(err => {
    console.log(err)
  })
}

const createProduct = (userId, token, product) => {
  return fetch(`http://localhost:5000/api/product/create/${userId}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: product
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err)
  })
}

const getCategories = (req,res) => {
  return fetch(`http://localhost:5000/api/categories`, {
    method: "GET",
  })
  .then(response => {
    return response.json();
  })
  .catch(err => {
    console.log(err)
  })
}


export {
  createCategory, createProduct,getCategories
}
