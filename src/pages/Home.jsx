import React from "react";
import { useFetchBloodCountQuery } from "../store/api/BloodCountSlice";
import Ap from "../uploads/A+.png";
import Am from "../uploads/A-.png";
import Op from "../uploads/O+.png";
import Om from "../uploads/O-.png";
import ABp from "../uploads/AB+.png";
import ABm from "../uploads/AB-.png";
import Bp from "../uploads/B+.png";
import Bm from "../uploads/B-.png";


const bloodGroupImages = {
  "A+": Ap,
  "A-": Am,
  "O+": Op,
  "O-": Om,
  "AB+": ABp,
  "AB-": ABm,
  "B+": Bp,
  "B-": Bm
};

function Home() {
  const { data: bloodCounts, error, isLoading } = useFetchBloodCountQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-4 py-16 bg-[#ede0d4] ">
      <h1 className="text-center text-black-500 text-3xl sm:text-4xl lg:text-6xl mt-5">
        Save <span className="text-green-600">Life</span>, Give <span className="text-red-500">Blood</span>
      </h1>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="sr-only">Blood Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 justify-center">
          {bloodCounts.map((bloodCount) => (
            <a href="#" className="group" key={bloodCount._id}>
              <div className="aspect-w-1 aspect-h-1 w-40 h-40 overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={bloodGroupImages[bloodCount._id]}
                  alt={`${bloodCount._id} blood group`}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700">{bloodCount._id}</h3>
              <p className="mt-1 text-base sm:text-lg lg:text-xl font-medium text-gray-900">{bloodCount.totalUnits}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
