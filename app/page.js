'use client'
import { useState,useEffect } from "react";
import Link from 'next/link'
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Users, Monitor, ShoppingBag, Leaf, HeartPulse, Gamepad2, MoreHorizontal } from "lucide-react";
export default function HomePage() {


  const [projects, setProjects] = useState([]);
  

  const [categories, setCategories] = useState([]);
  const categoryNames = [
      { name: "technology", icon: "🖥️" },
      { name: "consumer products", icon: "🛍️" },
      { name: "education", icon: "🎓" },
      { name: "healthcare", icon: "🏥" },
      { name: "gaming", icon: "🎮" },
      { name: "more", icon: "➕" },
  ];

    const products = [
    { id: 1, img: "/product1.png", name: "Product 1" },
    { id: 2, img: "/product2.png", name: "Product 2" },
    { id: 3, img: "/product3.png", name: "Product 3" },

  ];


  const stats = {
    totalFunds: 125, // In million dollars
    successfulProjects: 15000,
    globalBackers: 500000,
}
  useEffect(() => {
    const fetchTopProjects = async () => {
      try {
        const response = await fetch("http://82.29.153.135:5000/top-projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchTopProjects();
  }, []);
  useEffect(() => {
      fetch("http://82.29.153.135:5000/campaigns")  // Replace with your actual campaigns API endpoint
          .then((res) => res.json())
          .then((data) => {
              const categoryCounts = {};
              data.forEach((campaign) => {
                  categoryCounts[campaign.category] = (categoryCounts[campaign.category] || 0) + 1;
              });
              setCategories(categoryCounts);
          })
          .catch((err) => console.error("Error fetching campaigns:", err));
  }, []);

  const capitalize=(text)=>{
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
  
  return (
    <>
    <section className="flex  mt-10 flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-gradient-to-r from-purple-100 to-white">
      {/* Left Content */}
      <div className="max-w-xl text-center md:text-left">
        <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-md mb-4">
          <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
          <p className="text-xs font-semibold text-gray-700">Trusted by 500,000+ Backers Worldwide</p>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 leading-tight">
          Launch Your Next Big Idea
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Join our community of innovators and entrepreneurs to bring groundbreaking products and startups to life.
        </p>
        <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Link href='/create-campaign'>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg rounded-lg shadow-md">
            Get Started
          </button>
          </Link>
          
          <Link href='/explore'>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 text-lg rounded-lg shadow-md">
            Explore Projects
          </button>
          </Link>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            <Image src="/man.jpg" alt="Backers" width={40} height={40} className="rounded-full border border-white" />
            <Image src="/girl.jpg" alt="Backers" width={40} height={40} className="rounded-full border border-white" />
            <span className="bg-white text-blue-500 px-3 py-1 rounded-full shadow-md text-sm font-semibold">+2k</span>
          </div>
          <p className="text-gray-600 text-sm">Trusted by 2,000+ Creators</p>
        </div>
      </div>

      {/* Right-side Hero Image */}
      <div className="hidden md:block w-1/2">
        <Image src="/hero.jpeg" alt="Workspace" width={600} height={400} className="rounded-lg shadow-md" />
      </div>
    </section>









        <section className="py-12 min-h-screen flex  flex-col justify-center bg-white   text-center">
            <h2 className="text-3xl font-bold text-purple-700">Explore Categories</h2>
            <p className="text-gray-500 mt-2">
                Browse through our curated collection of innovative projects across various categories.
            </p>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categoryNames.map((cat, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center hover:shadow-xl transition-all"
                    >
                        <span className="text-3xl">{cat.icon}</span>
                        <h3 className="text-lg text-slate-600 font-semibold mt-2">{capitalize(cat.name)}</h3>
                        <p className="text-gray-500">{categories[cat.name] || 0} Projects</p>
                    </div>
                ))}
            </div>
        </section>

                        {/* 
Top Funded */}

      <section className="bg-gray-900 text-white py-10 flex justify-center items-center min-h-screen">
        <div className="max-w-5xl w-full px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            🚀 Top Funded Projects
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Discover the most successful projects supported by our community.
          </p>

          {projects.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="rounded-xl shadow-xl overflow-hidden"
            >
              {projects.map((project) => (
                <SwiperSlide key={project._id} className="relative">
                  <img
                    src={`http://82.29.153.135:5000${project.image}`}
                    alt={project.name}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
                    <h3 className="text-xl md:text-2xl font-semibold">
                      {project.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
                      {project.description}
                    </p>
                    <span className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
                      💰 {project.pledged.toLocaleString()} USD
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-gray-400">No projects available.</p>
          )}
        </div>
      </section>
      {/*        Slider Section */}

      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white flex justify-center items-center mt-0 min-h-screen p-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Explore Our Latest Products
          </h2>
          <p className="text-center text-gray-300 mb-4">
            Making Orthodox Weddings Affordable – A One-Stop Wedding Mall
          </p>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="rounded-xl shadow-xl overflow-hidden"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl"
                />
                {/* Text Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
                  <h3 className="text-xl md:text-2xl font-semibold">{product.name}</h3>
                  <Link href='/projects'><button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
                    View More
                  </button>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>




        <section className="py-16 bg-slate-100 text-center">
            <h2 className="text-3xl font-bold text-purple-700">Success Stories</h2>

            {/* Stats Section */}
            <div className="mt-6 flex flex-wrap justify-center gap-12 text-center">
                <div>
                    <h3 className="text-3xl font-extrabold text-purple-600">${stats.totalFunds}M+</h3>
                    <p className="text-gray-500">Total Funds Raised</p>
                </div>
                <div>
                    <h3 className="text-3xl font-extrabold text-purple-600">{stats.successfulProjects}+</h3>
                    <p className="text-gray-500">Successful Projects</p>
                </div>
                <div>
                    <h3 className="text-3xl font-extrabold text-purple-600">{stats.globalBackers}+</h3>
                    <p className="text-gray-500">Global Backers</p>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 mx-10">
                {/* Testimonial 1 */}
                <div className="p-6  bg-white shadow-md rounded-xl">
                    <div className="flex items-center space-x-4">
                        <img src="http://82.29.153.135:3000/girl.jpg" alt="Rabbi Moshe Goldstein" className="w-12 h-12 rounded-full" />
                        <div>
                            <h4 className="font-bold text-gray-700">Rabbi Moshe Goldstein</h4>
                            <p className="text-sm text-gray-500">Rosh Kollel, Beis Medrash Ohr Torah</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-700">
                        "Fundify enabled us to establish a thriving kollel that supports 50 families dedicated to full-time Torah study. 
                        The platform’s reach within the Jewish community was invaluable."
                    </p>
                  
                </div>

                {/* Testimonial 2 */}
                <div className="p-6 bg-white shadow-md rounded-xl">
                    <div className="flex items-center space-x-4">
                        <img src="/man.jpg" alt="Rabbi Yitzchak Cohen" className="w-12 h-12 rounded-full" />
                        <div>
                            <h4 className="font-bold text-gray-700">Rabbi Yitzchak Cohen</h4>
                            <p className="text-sm text-gray-500">Director, Chesed Organization</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-700">
                        "Through Fundify, we were able to create a comprehensive gemach that serves 
                        hundreds of families in our community. The support we received was overwhelming."
                    </p>
                   
                </div>
            </div>
        </section>
    



      </>
  )
}


