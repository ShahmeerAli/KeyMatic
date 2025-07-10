import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [String],
  price: { type: Number, required: true },
  rating:Number,
  category: String,
  image: String
}, {
  collection: 'products' 
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);