'use client'

import { FaBullseye, FaShareAlt, FaChartLine } from "react-icons/fa";
import Link from 'next/Link'

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-gradient-to-b mt-20 from-gray-100 to-white text-gray-700 py-16 px-6 flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl text-green-600 font-bold mb-6">
          Three Steps to Success
        </h1>
        <p className="text-lg text-gray-600">
          Our simple process helps you launch, share, and achieve success seamlessly.
          Follow these three steps and start making an impact today.
        </p>
      </section>

      {/* Steps Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full text-center space-y-10 md:space-y-0 mt-12">
        {/* Step 1 */}
        <div className="flex flex-col items-center w-64 bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <div className="w-16 h-16 bg-green-100 text-green-700 flex items-center justify-center rounded-full shadow-md">
            <FaBullseye size={32} />
          </div>
          <h2 className="text-xl font-semibold mt-4">Create Your Campaign</h2>
          <p className="text-gray-600 mt-2">
            Use our easy-to-navigate tools to design an engaging campaign page.
          </p>
        
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center w-64 bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full shadow-md">
            <FaShareAlt size={32} />
          </div>
          <h2 className="text-xl font-semibold mt-4">Share Your Vision</h2>
          <p className="text-gray-600 mt-2">
            Reach a network of investors eager to support meaningful ideas.
          </p>
          
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center w-64 bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
          <div className="w-16 h-16 bg-purple-100 text-purple-700 flex items-center justify-center rounded-full shadow-md">
            <FaChartLine size={32} />
          </div>
          <h2 className="text-xl font-semibold mt-4">Reach Your Goals</h2>
          <p className="text-gray-600 mt-2">
            Track your funding progress in real-time and keep your supporters updated.
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <section className="max-w-5xl mt-20 space-y-12">
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <img src="/shield.png" alt="Secure" className="w-16 mx-auto" />
            <h3 className="text-lg font-semibold mt-4">Secure Platform</h3>
            <p className="text-gray-600 mt-2">
              Our robust security measures ensure safe transactions and data protection.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <img src="/customer-service.png" alt="Support" className="w-16 mx-auto" />
            <h3 className="text-lg font-semibold mt-4">24/7 Support</h3>
            <p className="text-gray-600 mt-2">
              Our dedicated team is always available to assist you on your journey.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <img src="/growth.png" alt="Growth" className="w-16 mx-auto" />
            <h3 className="text-lg font-semibold mt-4">Proven Growth</h3>
            <p className="text-gray-600 mt-2">
              Many users have successfully launched and expanded their projects with us.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-20 py-16 px-10 bg-blue-600 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg md:text-xl mt-4">
          Take the first step towards success. Create your campaign now!
        </p>
        <Link href='/create-compaign' className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md">
          Get Started
        </Link>
      </section>

      {/* Spacer */}
      <div className="h-32"></div>
    </main>
  );
}
