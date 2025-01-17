import React from "react";
import Image from "next/image";

const AuthPage = () => {
  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Left Section */}
      <div className="w-full md:w-2/3 bg-gray-900 p-8 relative">
        <div className="absolute inset-0 -z-10">
          {/* SVG Vector Shape */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#a855f7"
              d="M0,256L720,192L1440,256L1440,320L720,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-2 gap-6 relative">
          {/* Grid Item 1 */}
          <div className="bg-gray-100 rounded-3xl p-6 flex flex-col justify-between shadow-md lg:col-span-2 lg:row-span-2">
            <Image
              src="/team.png"
              alt="Teamwork"
              className="w-full h-48 object-cover rounded-lg mb-4"
              width={300}
              height={200}
            />
            <h2 className="text-gray-500 text-lg font-medium">
              Teams Together
            </h2>
            <h1 className="text-gray-900 font-extrabold text-4xl leading-tight mt-4">
              Bring your team together
            </h1>
            <p className="text-gray-600 text-lg mt-4 leading-relaxed">
              Collaborate effectively and boost productivity with our platform.
            </p>
            <button className="mt-6 bg-black text-white font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300">
              Learn More
            </button>
          </div>

          {/* Grid Item 2 */}
          <div className="bg-purple-100 rounded-3xl p-6 flex flex-col justify-between shadow-md lg:col-span-2">
            <Image
              src="/collaboration.png"
              alt="Collaboration"
              className="w-full h-48 object-cover rounded-lg mb-4"
              width={300}
              height={200}
            />
            <h3 className="text-gray-900 text-2xl font-bold">
              Collaborate everywhere
            </h3>
            <p className="text-gray-600 mt-2">
              Get our free mobile application and stay connected.
            </p>
            <button className="mt-6 bg-green-400 text-white py-2 px-4 rounded-full font-medium hover:bg-green-500 transition duration-300">
              Download
            </button>
          </div>

          {/* Grid Item 3 */}
          <div className="bg-blue-100 rounded-3xl p-6 flex flex-col justify-between shadow-md">
            <Image
              src="/png.png"
              alt="Tasks"
              className="w-full h-48 object-cover rounded-lg mb-4"
              width={300}
              height={200}
            />
            <h3 className="text-gray-900 text-2xl font-bold">
              Manage Your Tasks
            </h3>
            <p className="text-gray-600 mt-2">
              Organize and track your team’s progress seamlessly.
            </p>
            <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-full font-medium hover:bg-blue-600 transition duration-300">
              Explore Features
            </button>
          </div>

          {/* Grid Item 4 */}
          <div className="bg-green-100 rounded-3xl p-6 flex flex-col justify-between shadow-md">
            <Image
              src="/chef.png"
              alt="Analytics"
              className="w-full h-48 object-cover rounded-lg mb-4"
              width={300}
              height={200}
            />
            <h3 className="text-gray-900 text-2xl font-bold">
              Analytics and Insights
            </h3>
            <p className="text-gray-600 mt-2">
              Gain actionable insights to improve your team’s performance.
            </p>
            <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded-full font-medium hover:bg-green-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 bg-white flex flex-col justify-center items-center p-10">
        <h2 className="text-3xl font-bold mb-6">Login to Your Account</h2>
        <form className="w-full max-w-sm space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-purple-600 transition"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-purple-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
