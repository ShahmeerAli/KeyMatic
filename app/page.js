import Image from "next/image";
import "./globals.css";
import MainCard from "./components/MainCard";
import TrendingCard from "./components/TrendingCard";
import Link from "next/link";

export default function Home() {
  const details = [
    {
      "id": 1,
      "picture": "/shield.png",
      "title": "High Performance",
      "description": "Engineered for speed and precision to enhance your computing experience."
    },
    {
      "id": 2,
      "picture": "/electricity.png",
      "title": "Sleek Design",
      "description": "Modern aesthetics that complement any workspace or gaming setup with premium finishes."
    },
    {
      "id": 3,
      "picture": "/color.png",
      "title": "Durable Quality",
      "description": "Built to last with premium materials and rigorous testing standards for long-term reliability."
    }
  ]

  const trending = [{
    "id": 1,
    "picture": "/keybaord1.png",
    "title": "Quantum Mechanical Keyboard",
    "price": "129.00$"
  },
  {
    "id": 2,
    "picture": "/mouse4.png",
    "title": "Neon Gaming Mouse",
    "price": "74.99$"
  },
  {
    "id": 3,
    "picture": "/headset1.png",
    "title": "Atlas Wireless Headset",
    "price": "34.99$"
  }]

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen">
      
      
      <div className="relative w-full h-44 sm:h-44 md:h-54 lg:h-60 xl:h-70 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
        <Image 
          src="/BannerImg.png" 
          alt="banner" 
          fill 
          className="object-cover transform scale-105 hover:scale-110 transition-transform duration-700 ease-out"
          priority
        />
       
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
      </div>

      <div className="relative w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        
      
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="flex-1 text-center lg:text-left mt-6 lg:mt-0 relative z-10">
          <div className="mb-4 inline-block">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text text-sm font-semibold tracking-wide uppercase">
              Premium Computing Accessories
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Elevate Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Setup
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed max-w-2xl">
            Discover premium computer accessories designed for 
            <span className="text-cyan-400 font-semibold"> performance</span> and 
            <span className="text-blue-400 font-semibold"> style</span>. 
            Transform your workspace into a productivity powerhouse.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/products">
              <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold rounded-xl text-white transform hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25 overflow-hidden">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            
        
          </div>

          
          <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">10K+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-400">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">99%</div>
              <div className="text-sm text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>

  
        <div className="flex-1 flex justify-center lg:justify-end mt-8 sm:mt-10 md:mt-12 lg:mt-0 relative z-10">
          <div className="relative group">
           
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75"></div>
            
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-full border border-gray-700 shadow-2xl">
              <Image 
                src="/r.jpg" 
                width={280} 
                height={280}
                alt="Main banner"
                className="rounded-full w-48 h-48 sm:w-60 sm:h-60 md:w-70 md:h-70 lg:w-76 lg:h-76 xl:w-80 xl:h-80 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
              />
            </div>
            
           
            
          </div>
        </div>
      </div>

     
      <div className="relative mt-16 sm:mt-20 md:mt-24 lg:mt-32 py-16 bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text text-sm font-semibold tracking-wide uppercase">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why Choose 
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Keymatic?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the difference with our premium accessories designed for professionals and enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
            {details.map((detail, index) => (
              <div key={detail.id} className={`transform hover:scale-105 transition-all duration-500 delay-${index * 100}`}>
                <MainCard
                  image={detail.picture}
                  names={detail.title}
                  desc={detail.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <div className="relative mt-16 sm:mt-20 md:mt-24 lg:mt-32 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text text-sm font-semibold tracking-wide uppercase">
              Hot Products
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Trending 
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Now
            </span>
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our most popular products loved by thousands of customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
          {trending.map((trend, index) => (
            <div key={trend.id} className={`transform hover:scale-105 transition-all duration-500 delay-${index * 150}`}>
              <TrendingCard
                id={trend.id}
                image={trend.picture}
                names={trend.title}
                price={trend.price}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-16 sm:mt-20 md:mt-24 lg:mt-32 py-20 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-gray-900/80"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12">
          <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Upgrade?
            </span>
          </h4>
          <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their setups with Keymatic
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 font-bold rounded-xl text-white transform hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25 overflow-hidden">
                <span className="relative z-10">Explore Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm">Free shipping on orders over $75</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative w-full bg-gradient-to-r from-slate-900 to-gray-900 py-12 mt-16 sm:mt-20 md:mt-24 lg:mt-32 border-t border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
        
        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h5 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                Keymatic
              </h5>
              <p className="text-gray-400 text-sm">Elevating your computing experience</p>
            </div>
            
          
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Keymatic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}