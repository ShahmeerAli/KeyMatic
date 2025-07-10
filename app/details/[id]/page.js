import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail({params}) {
  
  const { id } = params;

  
  const productMap = {
    1: {
      title: "Quantum Mechanical Keyboard",
      price: "$129.99",
      image: "/keybaord1.png",
    },
    2: {
      title: "Neon Gaming Mouse",
      price: "$74.99",
      image: "/mouse4.png",
    },
    3: {
      title: "Atlas Wireless Headset",
      price: "$34.99",
      image: "/headset1.png",
    }
  };

  const product = productMap[id]





  return (
    <>
      <div className="bg-gray-700 text-white px-4 py-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

          <div className="lg:w-1/2 space-y-6">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt="Quantum Mechanical Keyboard"
                width={200}
                height={300}
                className="object-cover rounded animate-pulse"
              />
            </div>
            <div className="flex space-x-4">
              {['/keybaord1.png', '/keybaord2.png', '/keybaord3.png'].map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Keyboard Angle ${index + 1}`}
                  width={96}
                  height={96}
                  className="rounded cursor-pointer object-cover"
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold">{product.title}</h1>

            <div className="flex items-center gap-4">
              <div className="flex text-yellow-400 text-xl space-x-1">
                {[1,2,3,4].map(star => <i key={star} className="fas fa-star"></i>)}
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="text-gray-200">42 reviews</span>
              <a href="#reviews" className="text-blue-300 underline">Write a review</a>
            </div>

            <p className="text-3xl font-extrabold text-sky-100">{product.price}</p>

            <p className="text-gray-300">
              The Quantum Mechanical Keyboard redefines typing precision with its advanced mechanical switches and customizable RGB lighting.
            </p>

            <ul className="list-disc pl-5 text-gray-300">
              <li>Cherry MX Red switches</li>
              <li>Per-key RGB backlighting</li>
              <li>Aluminum frame</li>
              <li>Programmable keys</li>
              <li>Detachable USB-C cable</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <select className="bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white">
                <option>Cherry MX Red</option>
                <option>Cherry MX Blue</option>
                <option>Cherry MX Brown</option>
              </select>

              <select className="bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white">
                <option>US QWERTY</option>
                <option>UK QWERTY</option>
                <option>AZERTY</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex border border-gray-500 rounded overflow-hidden">
                <button className="px-3 py-1 bg-gray-800 hover:bg-gray-600">-</button>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  className="w-12 text-center bg-gray-700 border-x border-gray-600 text-white"
                />
                <button className="px-3 py-1 bg-gray-800 hover:bg-gray-600">+</button>
              </div>
              <button className="bg-gray-200 hover:bg-gray-900 px-5 py-2 rounded text-gray-800 font-semibold">Add to Cart</button>
              <button className="bg-gray-800 hover:bg-gray-900 px-5 py-2 rounded text-white font-semibold">Buy Now</button>
            </div>

            <div className="text-sm text-gray-400">
              <p><span className="font-semibold text-white">SKU:</span> KB-QMK-001</p>
              <p><span className="font-semibold text-white">Category:</span> Keyboards</p>
              <p><span className="font-semibold text-white">Availability:</span> In Stock (25 units)</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white mt-16 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Detailed Description</h2>
          <p className="text-gray-300 mb-4">
            Built for performance and style, the Quantum Mechanical Keyboard offers exceptional tactile feedback and customization features.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <i className="fas fa-tachometer-alt text-4xl mb-3 text-sky-400"></i>
              <h3 className="text-lg font-semibold">Fast Response</h3>
              <p className="text-gray-400">Experience lightning-fast input with optimized key travel and actuation.</p>
            </div>
            <div>
              <i className="fas fa-lightbulb text-4xl mb-3 text-sky-400"></i>
              <h3 className="text-lg font-semibold">Custom RGB</h3>
              <p className="text-gray-400">Fully programmable RGB lighting for personal flair.</p>
            </div>
            <div>
              <i className="fas fa-cogs text-4xl mb-3 text-sky-400"></i>
              <h3 className="text-lg font-semibold">Durability</h3>
              <p className="text-gray-400">Built with aircraft-grade aluminum for lasting strength.</p>
            </div>
            <div>
              <i className="fas fa-usb text-4xl mb-3 text-sky-400"></i>
              <h3 className="text-lg font-semibold">USB-C Support</h3>
              <p className="text-gray-400">Modern connectivity with detachable USB-C cable.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full bg-gray-900 py-6">
        <p className="text-white text-xs text-center">
          © 2025 Keymatic. All rights reserved.
        </p>
      </footer>
    </>
  );
}