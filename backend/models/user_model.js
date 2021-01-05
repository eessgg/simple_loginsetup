import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash_password: {
    type: String,
    required: true
  },
  username: { 
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  salt: String,
  role: {
    type:Number,
    default: 0
  }
}, {
  timestamps: true
})

// virtual
userSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4()
    this.hash_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hash_password
  },

  encryptPassword: function(password) {
    if(!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex")
    } catch (error) {
      return "";
    }
  }
}

export default mongoose.model('User', userSchema)