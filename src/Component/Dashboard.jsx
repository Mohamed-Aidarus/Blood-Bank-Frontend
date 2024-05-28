import React from 'react'

// import Ap from '../uploads/A+.png';
// import Am from '../uploads/A-.png';
// import Op from '../uploads/O+.png';
// import Om from '../uploads/O-.png';
// import ABp from '../uploads/AB+.png';
// import ABm from '../uploads/AB-.png';

export default function Dashboard() {
  return (
    <div className="bg-[#CDDBE6  ">
    <h1 className="text-center text-black-500 text-6xl  mt-15 ">Save <span className="text-green-600">Life</span>, Give <span className="text-red-500">Blood</span></h1>
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 mb-1 ">
      <h2 className="sr-only">Blood Groups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 justify-center">
        <a href="#" className="group">
          <div className="aspect-h-1 aspect-w-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="" alt="A+ blood group" className="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">A+</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">100</p>
        </a>
        <a href="#" className="group">
          <div className="aspect-h-1 aspect-w-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="" alt="A- blood group" className="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">A-</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">50</p>
        </a>
        <a href="#" className="group">
          <div className="aspect-h-1 aspect-w-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="" alt="O+ blood group" className="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">O+</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">75</p>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-10 justify-center">
        <a href="#" className="group">
          <div className="aspect-h-1 aspect-w-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="" alt="O- blood group" className="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">O-</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">30</p>
        </a>
        <a href="#" className="group">
          <div className="aspect-h-1 aspect-w-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="" alt="AB+ blood group" className="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">AB+</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">20</p>
        </a>
        <a href="#" className="group">
          <div className="aspect-h-1 aspect-w-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src="" alt="AB- blood group" className="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">AB-</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">10</p>
        </a>
      </div>
    </div>

  </div>
  )
}
