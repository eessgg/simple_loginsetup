import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
      username: {
          type: String,
          trim: true,
          required: true,
      },
      email: {
          type: String,
          trim: true,
          required: true,
          unique: true
      },
      hash_password: {
          type: String,
          required: true
      },
      about: {
          type: String,
          trim: true
      },
      salt: String,
      role: {
          type: Number,
          default: 0
      },
      history: {
          type: Array,
          default: []
      }
  },
  { timestamps: true }
);


export default mongoose.model('Category', categorySchema);
