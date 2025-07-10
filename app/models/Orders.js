import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
 
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: false 
  },
  
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      name: { type: String, required: true },
      image: { type: String }
    }
  ],

  totalAmount: { type: Number, required: true },

  shippingAddress: { type: String, required: true },

  customerInfo: {
    fullname: { type: String, required: true },
    email: { type: String, required: true }
  },

  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  }

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);