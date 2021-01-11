import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  price: {
    type: Number,
    trim: true,
    required: true
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  },
  photo: {
    data: Buffer,
    contentType: String
  }
}, {timestamps: true});


export default mongoose.model('Product', productSchema);
