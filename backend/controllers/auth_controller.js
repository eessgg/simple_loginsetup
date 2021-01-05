import User from "../models/user_model.js";
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { secretKey } from '../config/vars.js';

const register = async (req, res) => {
  try {
    let {username, email, password} = req.body;
    if(!username || !email || !password) {
      res.status(400).json({message: "Preencha os campos."})
    }

    if(username.length < 5) {
      res.status(400).json({message: "Usuário precisa mais de cinco chars."})
    }

    const existingUser = await User.findOne({email})
    if(existingUser)
      res.status(400).json({message: "Email já registrado."})

    const newUser = new User({
      username, email, password
    })
    const savedUser = await newUser.save()
    return res.json(savedUser)
  
  } catch (error) {
    res.status(500).json({ error });
    throw error;
  }
}

const login = (req, res) => {
  const { email, password, username } = req.body;

  User.findOne({email}, (err, user) => {
    if(err || !user) { 
      return res.status(400).json({ message: err  })
    }

    if(!user.authenticate(password)) { 
      return res.status(401).json({ message: "Email/password dont match" })
    }

    const token = jwt.sign({_id: user._id}, secretKey.JWT_SECRET);
    res.cookie("t", token, {expire: new Date() + 9999});
    
    const { _id, username, email, role } = user;
    return res.json({token, user: {_id, username, email, role}})
  });
}

const signout = (req, res) => {
  res.clearCookie("t")
  res.json({message: "Signout success!"})
}

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
  signout,
  getUserById,
  requireSignin,
  isAuth,
  isAdmin
}