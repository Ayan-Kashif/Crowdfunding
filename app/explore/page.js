import Link from "next/link";
import { Lightbulb, HandCoins, Users } from "lucide-react";

export default function ExploreProjects() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section
        className="h-screen flex flex-col items-center justify-center text-center px-6 bg-cover bg-center relative text-white"
        style={{
          backgroundImage: "url('/landing.jpeg')",
        }}
      >
        <div  className="absolute inset-0"></div>
        <div  className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-4 animate-fade-in">
            Discover the Next Big Idea
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto  mb-10 animate-fade-in">
            From innovative products to community projects, explore campaigns that align with your interests and values.
          </p>
          <Link
            href="/projects"
            className=" bg-white mt-10 text-blue-700 px-6 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors shadow-lg animate-bounce"
          >
            Browse Campaigns
          </Link>
        </div>
      </section>

      {/* Information Boxes Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 py-[200px] gap-8 px-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-xl text-center transform hover:scale-105 transition-transform">
          <Lightbulb size={50} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Secure Funding</h2>
          <p>Get the resources you need to bring your vision to life with secure and transparent crowdfunding.</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-8 rounded-lg shadow-xl text-center transform hover:scale-105 transition-transform">
          <HandCoins size={50} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Support Innovation</h2>
          <p>Back ideas that inspire and drive change, helping entrepreneurs and creators succeed.</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white p-8 rounded-lg shadow-xl text-center transform hover:scale-105 transition-transform">
          <Users size={50} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Community Impact</h2>
          <p>Invest in meaningful projects that align with your values and create lasting impact.</p>
        </div>
      </section>
    </main>
  );
}
  