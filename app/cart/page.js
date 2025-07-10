'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  getCartFromStorage, 
  removeFromCart, 
  updateCartQuantity, 
  clearCart, 
  getCartTotal 
} from '../utils/cartUtils';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const items = getCartFromStorage();
    setCartItems(items);
    setLoading(false);
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCart = removeFromCart(productId);
    setCartItems(updatedCart);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCart = updateCartQuantity(productId, newQuantity);
    setCartItems(updatedCart);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      setCartItems([]);
    }
  };

  const total = getCartTotal();
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen">
      
      <div className="relative py-16 bg-gradient-to-r from-cyan-600/10 to-blue-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Shopping
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Cart
              </span>
            </h1>
            <p className="text-gray-300 text-lg">
              {itemCount > 0 ? `${itemCount} item${itemCount > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-8xl mb-8">🛒</div>
            <h2 className="text-white text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 text-lg mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/products">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold rounded-xl text-white transform hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Cart Items</h2>
                <button 
                  onClick={handleClearCart}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex flex-col sm:flex-row gap-6">
                      
                      <div className="flex-shrink-0">
                        <Image 
                          src={item.image || '/placeholder.png'} 
                          width={120} 
                          height={120} 
                          alt={item.title}
                          className="rounded-lg object-cover"
                        />
                      </div>

                   
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-cyan-400 font-bold text-lg mb-4">${item.price.toFixed(2)}</p>

                          <div className="flex items-center gap-4 mb-4">
                          <span className="text-gray-300">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                            >
                              -
                            </button>
                            <span className="text-white font-semibold min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                            >
                              +
                            </button>
                          </div>
                        </div>

                      
                        <div className="flex justify-between items-center">
                          <span className="text-white font-semibold">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

         
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Items ({itemCount})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link href="/checkout">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-bold rounded-xl text-white transform hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25 mb-4">
                  Proceed to Checkout
                </button>
                </Link>
                

                <Link href="/products">
                  <button className="w-full bg-gray-700 py-3 font-semibold rounded-xl text-white hover:bg-gray-600 transition-colors duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
