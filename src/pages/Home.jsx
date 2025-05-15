import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React from "react";
import sideImg from "../assets/sideImg.png";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />


      {/* Main Content Area */}
      <main className="flex-1 bg-white">
        <div className="w-full bg-white px-6 md:px-12 py-16">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

            {/* Text Content */}
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                Nookli is your Knowledge Operating System —
              </h1>
              <p className="text-gray-700 mb-4">
                A modular platform to capture thinking, structure learning, and scale insight across people, projects, and time.
              </p>
              <p className="text-gray-700 mb-4">
                No more lost docs, siloed notes, or fragmented workflows. Just focused progress.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <input
                  type="email"
                  placeholder="Enter Your Email Here"
                  className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto"
                />
                <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
                  Join the waiting list
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <img
                src={sideImg}
                alt="Dashboard preview"
                className="w-full h-auto max-w-[600px] mx-auto"
              />
            </div>

          </div>
        </div>
      </main>
      <Footer />

    </div>
  );
};

export default LandingPage;
