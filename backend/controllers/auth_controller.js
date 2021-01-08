import User from "../models/user_model.js";
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { secretKey } from '../config/vars.js';

const register = async (req, res) => {
  try {
    let {username, email, password} = req.body;

    // tests
    if(!username || !email || !password) {
      return res.status(400).json({message: "Preencha os campos."})
    }    
    if(username.length < 3) {
      return res.status(400).json({message: "Usuário precisa mais de 03 chars."})
    }
    const isThereUser = await User.findOne({email})
    if(isThereUser) {
      res.status(400).json({message: "Email já registrado."});
    }

    const newUser = new User({
      username, email, password
    })
    const savedUser = await newUser.save();

    return res.json(savedUser)  
  } catch (error) {
    res.status(500).json({ error });
    throw error;
  }
}

const login = (req, res) => {
  const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 9999 });
        const { _id, username, email, role } = user;
        return res.json({ token, user: { _id, email, username, role } });
    });
}

const logout = (req, res) => {
  res.clearCookie("t", {path:'/'});
  res.json({ message: 'logout success' });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

const getUserById  = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

function requireSignin() {
  return expressJwt({
    secret: secretKey.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  });
}

const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id ==req.auth._id;
  if(!user) {
    res.status(403).json({ error: "Access denied." })
  }
  next();
}

const isAdmin = (req, res, next) => {
  if(req.profile.role === 0) {
    res.status(403).json({ error: "Restricted area. Access denied." })
  }
  next();
}




export {
  register,
  getAllUsers,
  login,
  logout,
  getUserById,
  requireSignin,
  isAuth,
  isAdmin
}