import Link from "next/link";
import { AuthContext } from "../AuthContext";
export default function ForInvestors() {
    const {isLoggedIn}=AuthContext
    return (
      <main className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <section
          className="h-[80vh] bg-cover bg-center relative flex items-center justify-center text-white"
          style={{ backgroundImage: "url('/investors-bg.webp')" }}
        >
          <div className="bg-black bg-opacity-50 p-10 md:p-16 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl md:text-5xl font-bold">Invest in the Future</h1>
            <p className="mt-4 text-lg md:text-xl">
              Empower groundbreaking ideas, support businesses, and be part of a thriving community of investors.
            </p>
          </div>
        </section>
  
        {/* Why Invest with Us Section */}
        <section className="max-w-6xl mx-auto mt-20 px-6 space-y-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600">
            Why Invest with Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <img src="/growth.png" alt="Growth" className="w-24 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">High Growth Potential</h3>
              <p className="text-gray-700 mt-2">
                Discover startups and businesses with immense potential for success and high ROI.
              </p>
            </div>
  
            {/* Box 2 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <img src="/shield.png" alt="Security" className="w-24 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">Secure & Transparent</h3>
              <p className="text-gray-700 mt-2">
                Our platform ensures secure transactions and full transparency in investments.
              </p>
            </div>
  
            {/* Box 3 */}
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <img src="/web.png" alt="Network" className="w-24 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">Exclusive Network</h3>
              <p className="text-gray-700 mt-2">
                Connect with a network of like-minded investors and industry leaders.
              </p>
            </div>
          </div>
        </section>
  
        {/* How It Works Section */}
        <section className="max-w-6xl mx-auto mt-20 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-center mt-12 space-y-8 md:space-y-0 md:space-x-14">
            <img src="/investment.png" alt="Investment Process" className="w-full md:w-[40%] rounded-lg shadow-lg" />
            <ul className="md:w-1/2 space-y-6">
              <li className="text-lg md:text-xl text-gray-700 flex items-center">
                ✅ <span className="ml-2">Explore various promising projects & startups.</span>
              </li>
              <li className="text-lg md:text-xl text-gray-700 flex items-center">
                ✅ <span className="ml-2">Review business plans and investment opportunities.</span>
              </li>
              <li className="text-lg md:text-xl text-gray-700 flex items-center">
                ✅ <span className="ml-2">Invest securely through our platform.</span>
              </li>
              <li className="text-lg md:text-xl text-gray-700 flex items-center">
                ✅ <span className="ml-2">Track progress and returns in real-time.</span>
              </li>
            </ul>
          </div>
        </section>
  
        {/* Testimonials Section */}
        <section className="max-w-6xl mx-auto mt-20 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600">
            What Our Investors Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-gray-700 italic">
                "Investing through this platform has been a game-changer! The transparency and ease of use make it a top choice."
              </p>
              <h4 className="mt-4 font-semibold text-blue-600">— Sarah Thompson, Investor</h4>
            </div>
  
            {/* Testimonial 2 */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-gray-700 italic">
                "I've connected with incredible startups and watched my investments grow. Highly recommend!"
              </p>
              <h4 className="mt-4 font-semibold text-blue-600">— James Carter, Entrepreneur & Investor</h4>
            </div>
          </div>
        </section>
  
        {/* Call to Action Section */}
        <section className="mt-20 py-16 bg-blue-600 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to Invest in the Next Big Idea?
          </h2>
          <p className="text-lg md:text-xl mt-4 mb-6">
            Sign up today and start exploring incredible investment opportunities!
          </p>
          <Link href={isLoggedIn?'/register':'/explore'} className=" bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md">
            Get Started
          </Link>
        </section>
  
        {/* Spacer for better scrolling */}
        <div className="h-32"></div>
      </main>
    );
  }
  