'use client';
import React, { useState, useEffect } from 'react';
import ProductsCard from '../components/ProductsCard';
import Image from 'next/image';
import Link from "next/link";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
        if (sortBy) {
          params.append('sort', sortBy);
        }
        
        const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, sortBy]);


  const filteredProducts = products;
  
  
  const featuredProducts = products.filter(product => 
    product.featured === true || (product.rating && product.rating >= 4.5)
  );

 
  if (loading) {
    return (
      <div className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl mb-2">Error Loading Products</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen">
      
      
      <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10"></div>
        <Image 
          src="/productsbanner.png" 
          alt='Products Banner' 
          fill 
          className="object-cover transform scale-105 hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <div className="mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text text-sm font-semibold tracking-wide uppercase">
              Premium Collection
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl">
            Discover our complete range of premium computer accessories
          </p>
        </div>

        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60 z-10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40 z-10"></div>
      </div>

      
      <div className="relative bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-gradient-to-r from-sky-200 to-gray-200 text-black p-4 pr-10 rounded-xl border border-gray-600 hover:border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 shadow-lg backdrop-blur-sm"
                >
                  <option value="">All Categories</option>
                  <option value="keyboards">Keyboards</option>
                  <option value="mice">Mouse</option>
                  <option value="headsets">Headsets</option>
                  <option value="cases">Cases</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gradient-to-r from-sky-200 to-gray-200 text-black p-4 pr-10 rounded-xl border border-gray-600 hover:border-cyan-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 shadow-lg backdrop-blur-sm"
                >
                  <option value="">Sort By</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-gray-400 text-sm">
              Showing {filteredProducts.length} products
            </div>
          </div>
        </div>
      </div>

     
      {featuredProducts.length > 0 && (
        <div className="relative py-16 bg-gradient-to-r from-cyan-600/5 to-blue-600/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-sky-400 to-sky-800 text-transparent bg-clip-text text-sm font-semibold tracking-wide uppercase">
                  Staff Picks
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Our Top 
                </span>
                <span className="bg-gradient-to-r from-sky-400 to-sky-800 bg-clip-text text-transparent">
                  Picks
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Hand-picked favorites from our premium collection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.slice(0, 3).map((product, index) => (
                <div key={product._id} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <Link href={'/products/${product._id'}>
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-200 transition-all duration-300">
                    
                    <div className="aspect-square max-w-36 justify-center items-center mx-auto relative mb-4 overflow-hidden rounded-lg">
                      <Image 
                        src={product.image || '/placeholder.png'} 
                        width={200} 
                        height={200} 
                        alt={product.title}
                        className="w-full h-full object-cover transform group-hover:scale-100 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{product.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-400 font-bold text-xl">${product.price}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sky-400">★</span>
                        <span className="text-gray-300 text-sm">{product.rating || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="#all-products">
                <button className="group relative bg-gradient-to-r from-sky-400 to-sky-800 px-8 py-4 font-bold rounded-xl text-black transform hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-2xl hover:shadow-yellow-500/25 overflow-hidden">
                  <span className="relative z-10">View All Products</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      
      <div id="all-products" className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text text-sm font-semibold tracking-wide uppercase">
                Complete Collection
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                All 
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Browse our complete range of premium computer accessories
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-white text-xl mb-2">No products found</h3>
              <p className="text-gray-400">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product._id} 
                  className={`transform hover:scale-105 transition-all duration-500 delay-${(index % 4) * 50}`}
                >
                  <ProductsCard
                    id={product._id} 
                    image={product.image || '/placeholder.png'}
                    names={product.title}
                    price={`$${product.price}`}
                    rating={product.rating || 0}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <button className="group relative bg-gradient-to-r from-gray-800 to-gray-700 px-8 py-4 font-semibold rounded-xl text-white border-2 border-gray-600 hover:border-purple-400 hover:text-purple-400 transform hover:scale-105 transition-all duration-300 ease-out">
              Load More Products
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>

      
      <div className="relative py-16 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-gray-900/80"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Stay Updated
            </span>
          </h3>
          <p className="text-gray-300 text-lg mb-8">
            Get notified about new products, exclusive deals, and tech updates
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
            />
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 font-semibold rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      
      <footer className="relative w-full bg-gradient-to-r from-slate-900 to-gray-900 py-12 border-t border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Keymatic
              </h4>
              <p className="text-gray-400 text-sm mb-6 max-w-md">
                Elevating your computing experience with premium accessories designed for professionals and enthusiasts.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors duration-300 cursor-pointer">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
                  <span className="text-white text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 cursor-pointer">
                  <span className="text-white text-sm">i</span>
                </div>
              </div>
            </div>

          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Keymatic. All rights reserved. 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;