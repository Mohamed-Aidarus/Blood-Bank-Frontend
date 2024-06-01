import React from "react";
import Ap from "../uploads/A+.png";
import Am from "../uploads/A-.png";
import Op from "../uploads/O+.png";
import Om from "../uploads/O-.png";
import ABp from "../uploads/AB+.png";
import ABm from "../uploads/AB-.png";

function Home() {
  return (
    <div className="px-4 py-16 bg-[#ede0d4] ">
      <h1 className="text-center text-black-500 text-3xl sm:text-4xl lg:text-6xl mt-5">
        Save <span className="text-green-600">Life</span>, Give <span className="text-red-500">Blood</span>
      </h1>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="sr-only">Blood Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 justify-center">
          <a href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200">
              <img
                src={Ap}
                alt="A+ blood group"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700">A+</h3>
            <p className="mt-1 text-base sm:text-lg lg:text-xl font-medium text-gray-900">100</p>
          </a>
          <a href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200">
              <img
                src={Am}
                alt="A- blood group"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700">A-</h3>
            <p className="mt-1 text-base sm:text-lg lg:text-xl font-medium text-gray-900">50</p>
          </a>
          <a href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200">
              <img
                src={Op}
                alt="O+ blood group"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700">O+</h3>
            <p className="mt-1 text-base sm:text-lg lg:text-xl font-medium text-gray-900">75</p>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-10 justify-center">
          <a href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200">
              <img
                src={Om}
                alt="O- blood group"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700">O-</h3>
            <p className="mt-1 text-base sm:text-lg lg:text-xl font-medium text-gray-900">30</p>
          </a>
          <a href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200">
              <img
                src={ABm}
                alt="AB+ blood group"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700">AB+</h3>
            <p className="mt-1 text-base sm:text-lg lg:text-xl font-medium text-gray-900">20</p>
          </a>
          <a href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200">
              <img
                src={ABp}
                alt="AB- blood group"
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700">AB-</h3>
            <p className="mt-1 text-base sm:text-lg lg:text-xl font-medium text-gray-900">10</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
