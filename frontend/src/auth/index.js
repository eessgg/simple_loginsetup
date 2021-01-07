import {API} from '../config';
    
  const signup = (user) => {
    fetch(`http://localhost:5000/api/users/register`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(user)
      })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
  }

  const signin = (user) => {
    fetch(`http://localhost:5000/api/users/login`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(user)
      })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
  }

  const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
  };

  const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`http://localhost:5000/api/users/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

const isAuthenticated = () => {
  if (typeof window == 'undefined') {
      return false;
  }
  if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'));
  } else {
      return false;
  }
};

  export {signup, signin, authenticate, signout, isAuthenticated}