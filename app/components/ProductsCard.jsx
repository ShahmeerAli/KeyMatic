'use client';
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { addToCart } from '../utils/cartUtils';

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={"full" + i} className="text-yellow-400">★</span>);
  }
  if (halfStar) {
    stars.push(<span key="half" className="text-yellow-400">☆</span>);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={"empty" + i} className="text-gray-300">☆</span>);
  }

  return stars;
};

function ProductsCard(props) {
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Create product object with all necessary data
    const product = {
      _id: props.id || props._id, // Handle both possible prop names
      title: props.names,
      price: parseFloat(props.price.replace('$', '')), // Remove $ and convert to number
      image: props.image,
      rating: props.rating
    };

    try {
      addToCart(product);
      setShowSuccess(true);
      
      // Hide success message after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-gray-600 shadow-md hover:shadow-sky-700 hover:scale-100 transition duration-300 ease-in-out p-6 m-4 rounded-lg flex flex-col justify-between text-center max-w-sm mx-auto h-[350px] relative">
      {/* Success notification */}
      {showSuccess && (
        <div className="absolute top-2 left-2 right-2 bg-green-500 text-white text-sm py-2 px-3 rounded-lg z-10 animate-pulse">
          ✓ Added to cart!
        </div>
      )}

      <div>
        <Image 
          src={props.image} 
          width={100} 
          height={100} 
          alt={props.names} 
          className="mb-4 mx-auto transition-transform duration-300 hover:scale-110 hover:rotate-3" 
        />
        <h3 className="text-xl font-bold text-gray-200 mb-2">{props.names}</h3>
        <div className="flex items-center text-yellow-500 mt-1 justify-center">
          {renderStars(props.rating)} 
          <span className="ml-2 text-sm text-gray-200">({props.rating})</span>
        </div>
        <p className="text-gray-200 font-bold">{props.price}</p>
      </div>

      <div className="flex gap-4 justify-center mt-2 p-2">
        
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-28 h-10 rounded text-gray-700 hover:shadow-gray-400 hover:scale-105 transition duration-300 ease-in-out ${
            isAdding 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 hover:bg-gray-100'
          }`}
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductsCard;