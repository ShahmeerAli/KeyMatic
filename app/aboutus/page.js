"use client";
import Image from "next/image";

function AboutUsPage() {
  return (
    <div className="w-full bg-gray-700 text-white min-h-screen">
      
      {/* Hero Section */}
      <div className="w-full h-64 bg-gradient-to-r from-blue-800 to-gray-700 py-10 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">Welcome to Keymatic</h1>
        <p className="text-lg sm:text-xl max-w-3xl">
          Your one-stop destination for cutting-edge tech, innovative gadgets, and unmatched service.
        </p>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-300">Who We Are</h2>
        <p className="text-lg text-gray-200 mb-6 leading-relaxed text-center">
          At Keymatic, we are dedicated to delivering the best technology solutions to our community. From the latest gaming gear to everyday electronics, we offer only premium quality products.
        </p>
        <p className="text-lg text-gray-200 mb-10 leading-relaxed text-center">
          Our mission is to make technology more enjoyable, affordable, and accessible for all. Whether you're a gamer, developer, or casual user, we've got just the right tech for you.
        </p>

        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <Image
              src="/banner3.jpg"
              alt="Inside Our Store"
              width={800}
              height={450}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-sky-300 mb-10">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6">
            {[
              {
                title: "Customer First",
                description:
                  "Your satisfaction is our priority. We strive for a seamless and positive shopping experience.",
              },
              {
                title: "Innovation",
                description:
                  "We constantly explore new technology trends to keep you ahead of the curve.",
              },
              {
                title: "Uncompromised Quality",
                description:
                  "Every product is handpicked to ensure exceptional performance and durability.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-sky-400 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <h3 className="text-xl font-bold text-sky-200 mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full h-20 bg-gray-900 flex justify-center items-center mt-10 text-sm text-gray-400">
        <p>© 2025 Keymatic. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUsPage;
