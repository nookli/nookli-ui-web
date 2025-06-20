import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import sideImg from '../assets/sideImg.png';
import supabase from '../config/supabase';
import { toast } from 'react-toastify';
import AuthSync  from '../utils/AuthSync';

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  AuthSync

  const handleJoinWaitlist = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      const { error } = await supabase.from('waitlist').insert([{ email }]);
      if (error) throw error;
      toast.success("You've been added to the waitlist!");
      setEmail('');
    } catch (err) {
      toast.error('Something went wrong. Try again.');
      console.error('Waitlist error:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white">
        <div className="w-full bg-white px-6 md:px-12 py-16">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            {/* Text Content */}
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                Nookli is your Knowledge Operating System —
              </h1>
              <p className="text-gray-700 mb-4">
                A modular platform to capture thinking, structure learning, and
                scale insight across people, projects, and time.
              </p>
              <p className="text-gray-700 mb-4">
                No more lost docs, siloed notes, or fragmented workflows. Just
                focused progress.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Here"
                  className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto"
                />
                <button
                  onClick={handleJoinWaitlist}
                  className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                >
                  Join the waiting list
                </button>
              </div>
            </div>

            {/* Image */}
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
