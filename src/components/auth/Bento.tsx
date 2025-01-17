import React from "react";

export default function BentoDesign() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="bg-gray-100 rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-md">
          <div>
            <h2 className="text-gray-500 text-lg font-medium">
              Teams Together
            </h2>
            <h1 className="text-gray-900 font-extrabold text-6xl leading-tight mt-4">
              Bring your <br />
              team together <br />
              <span className="text-primary">Right here.</span>
            </h1>
            <p className="text-gray-600 text-lg mt-4 leading-relaxed">
              The quick lazy fox jumps over the lazy dog.
            </p>
            <button className="mt-6 bg-black text-white font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300">
              Learn More
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                We’re Xpace <br /> Founded in London
              </h3>
              <p className="text-gray-600 mt-2">
                A short message that will bring your customer into the world of
                your imagination.
              </p>
              <a
                href="#"
                className="mt-2 inline-block text-sm text-gray-900 font-semibold hover:underline"
              >
                Learn our Story →
              </a>
            </div>
          </div>
        </div>

        {/* Top Right Section */}
        <div className="bg-purple-100 rounded-3xl p-8 flex flex-col justify-between shadow-md">
          <div>
            <h3 className="text-gray-900 text-2xl font-bold">
              Collaborate everywhere
            </h3>
            <p className="text-gray-600 mt-2">
              Get our free mobile application.
            </p>
          </div>
          <div className="mt-6">
            <button className="bg-green-400 text-white py-3 px-6 rounded-full font-medium hover:bg-green-500 transition duration-300">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
