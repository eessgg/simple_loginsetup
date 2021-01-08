import User from "../models/user_model.js";

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
      if (err || !user) {
          return res.status(400).json({
              error: 'User not found'
          });
      }
      req.profile = user;
      next();
  });
};

export {
  userById
}