'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  getCartFromStorage, 
  getCartTotal, 
  clearCart 
} from '../utils/cartUtils';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    contactNumber: '',
    shippingAddress: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });
  const router = useRouter();

  useEffect(() => {
    
    const items = getCartFromStorage();
    setCartItems(items);
    setLoading(false);
    
    
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['username', 'fullName', 'email', 'contactNumber'];
    return required.every(field => formData[field].trim() !== '');
  };

 
  const createOrGetUser = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          username: formData.username,
          email: formData.email,
          phone: formData.contactNumber,
          address: formData.shippingAddress,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        return user._id;
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create/get user');
      }
    } catch (error) {
      console.error('Error creating/getting user:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setSubmitting(true);

    try {
     
      const userId = await createOrGetUser();
      console.log('User ID:', userId);

      
      const orderData = {
        user: userId,
        products: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
          name: item.title,
          image: item.image || ''
        })),
        totalAmount: getCartTotal(),
        shippingAddress: formData.shippingAddress,
        customerInfo: {
          fullname: formData.fullName,
          email: formData.email,
        }
      };

      console.log('Order data:', orderData);

      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        const error = await orderResponse.json();
        throw new Error(error.error || 'Failed to create order');
      }

      const order = await orderResponse.json();
      console.log('Created order:', order);

     
      clearCart();
      
      
      alert(`Order placed successfully! Order ID: ${order._id}`);
      router.push('/orders');

    } catch (error) {
      console.error('Error placing order:', error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const total = getCartTotal();
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-cyan-400/10 p-8 sm:p-12 space-y-10">

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 text-center">
          Checkout
        </h1>

        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Order Summary
          </h2>
          
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-start border-b border-gray-700 pb-6">
              <div className="flex gap-4">
                <Image 
                  src={item.image || '/placeholder.png'} 
                  width={60} 
                  height={60} 
                  alt={item.title}
                  className="rounded-lg object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-cyan-400">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-xl font-semibold text-white border-t border-gray-700 pt-6">
          <span>Total ({itemCount} items)</span>
          <span className="text-cyan-400">${total.toFixed(2)}</span>
        </div>

     
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Shipping & Payment Details
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="username"
              placeholder="Username *"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-xl p-4 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-xl p-4 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-xl p-4 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number *"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
              className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-xl p-4 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
            <textarea
              name="shippingAddress"
              placeholder="Shipping Address *"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              required
              rows="3"
              className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-xl p-4 col-span-2 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full relative group bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 font-bold rounded-xl text-black transform hover:scale-105 transition-all duration-300 shadow-xl shadow-yellow-300/20 hover:shadow-yellow-400/40 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="relative z-10">
              {submitting ? 'Processing...' : `Confirm and Pay $${total.toFixed(2)}`}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </div>
    </div>
  );
}