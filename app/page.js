import Link from "next/link";
import { FaEdit, FaHandHoldingHeart, FaShieldAlt, FaGlobe, FaUsers } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: "url('/main.jpeg')",
          backgroundSize: "cover",
          backgroundBlendMode: "lighten",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="text-center py-20 px-6 min-h-screen flex flex-col justify-center text-blue-500"
      >
        <h1 className="text-5xl font-extrabold">Bring Ideas to Life, Support the Future</h1>
        <p className="mt-4 text-lg text-purple-600 max-w-2xl mx-auto">
          Empowering small investors to support innovative projects, businesses, and ideas in a way that reflects our shared values and traditions.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            href="/create-campaign"
            className="bg-white hover:bg-slate-100 text-gray-700 px-6 py-4 rounded-lg font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Start a Campaign
          </Link>
          <Link
            href="/explore"
            className="bg-gray-800 text-white flex justify-center items-center px-6 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Explore Projects
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Features</h2>
          <p className="text-gray-600 mb-12">
            Discover the powerful features that make our platform stand out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {/* Feature 1 */}
          <div className="text-center p-6 bg-white shadow-lg rounded-lg transition-transform hover:scale-105">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-red-500 text-white text-3xl rounded-full shadow-md">
              <FaEdit />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Easy Campaign Creation</h3>
            <p className="text-gray-500 mt-2">Build your project page with simple tools and resources.</p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6 bg-white shadow-lg rounded-lg transition-transform hover:scale-105">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-purple-500 text-white text-3xl rounded-full shadow-md">
              <FaHandHoldingHeart />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Aligned with Our Values</h3>
            <p className="text-gray-500 mt-2">All campaigns adhere to religious and cultural guidelines.</p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6 bg-white shadow-lg rounded-lg transition-transform hover:scale-105">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-blue-500 text-white text-3xl rounded-full shadow-md">
              <FaShieldAlt />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Secure and Transparent</h3>
            <p className="text-gray-500 mt-2">Trust your investments with secure payment options and clear funding processes.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-b from-blue-500 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-6">
            Our platform is designed to empower creators, businesses, and investors by providing a trustworthy and value-driven crowdfunding solution.
            We strive to bring ideas to life in a way that respects our culture and beliefs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
          {/* Mission Item 1 */}
          <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <FaGlobe size={50} className="mb-4" />
            <h3 className="text-lg font-semibold">Global Reach</h3>
            <p className="text-white text-opacity-90 mt-2">
              Connecting investors and entrepreneurs from around the world.
            </p>
          </div>

          {/* Mission Item 2 */}
          <div className="flex flex-col items-center p-6 bg-white bg-opacity-20 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <FaUsers size={50} className="mb-4" />
            <h3 className="text-lg font-semibold">Empowering Communities</h3>
            <p className="text-white text-opacity-90 mt-2">
              Helping communities thrive by funding meaningful projects.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
