import Link from "next/link";
import { FaUsers, FaLightbulb, FaRocket, FaCogs, FaChartLine } from "react-icons/fa";

export default function ForCreators() {
    return (
        <main className="min-h-screen bg-gray-100 text-gray-900 py-16 px-6">
            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b  text-white">
               <div className="flex justify-center mb-4 items-center">
                <img src="/flag.png" alt="" className="w-40" />
               </div>
               
                <h1 className="text-5xl text-green-600 md:text-6xl font-extrabold drop-shadow-lg mb-4">Launch Your Vision</h1>
                <p className="text-lg  text-gray-700 md:text-xl max-w-2xl">
                    Turn your dreams into reality with our intuitive tools. From building your campaign page to managing your pledges, we support you every step of the way.
                </p>
                <Link href="/create-campaign">
                    <button className="mt-6 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors shadow-lg">
                        Start Your Campaign
                    </button>
                </Link>
            </section>

            {/* Key Benefits Section */}
            <section className="w-full flex flex-col min-h-screen justify-center items-center py-16">
                <h2 className="text-4xl font-bold text-center mb-8">Create with Confidence</h2>
                <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
                    <div className="bg-lime-400 p-6 rounded-xl relative shadow-lg text-center flex flex-col items-center">
                        <FaUsers size={50} className="text-gray-900 mb-4" />
                        <h3 className="text-xl font-bold">23 Million+ Backers</h3>
                        <p className="text-gray-800 mt-2">Connect with passionate, engaged backers who share your values and interests.</p>
                    </div>
                    <div className="bg-green-300 p-6 rounded-xl relative shadow-lg text-center flex flex-col items-center">
                        <FaLightbulb size={50} className="text-gray-900 mb-4" />
                        <h3 className="text-xl font-bold">Creative Independence</h3>
                        <p className="text-gray-800 mt-2">Create on your own terms with complete control over your project.</p>
                    </div>
                    <div className="bg-green-500 p-6 rounded-xl relative shadow-lg text-center flex flex-col items-center">
                        <FaRocket size={50} className="text-gray-900 mb-4" />
                        <h3 className="text-xl font-bold">Empowering Platform</h3>
                        <p className="text-gray-800 mt-2">Get support, tools, and resources to optimize your project’s success.</p>
                    </div>
                </div>
                <Link href="/create-campaign" >
                <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:opacity-80 transition shadow-lg">
                    Let's Create
                </button>
                </Link>
            </section>

            {/* How It Works Section */}
            <section className="bg-white py-16 px-6">
                <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center p-6 bg-gray-200 rounded-lg shadow-lg">
                        <FaCogs size={50} className="text-green-600 mb-4" />
                        <h3 className="text-xl font-semibold">Step 1: Create</h3>
                        <p className="text-gray-700 mt-2">Build your campaign page with engaging content and set your funding goal.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-gray-200 rounded-lg shadow-lg">
                        <FaChartLine size={50} className="text-green-600 mb-4" />
                        <h3 className="text-xl font-semibold">Step 2: Promote</h3>
                        <p className="text-gray-700 mt-2">Share your campaign with your network and attract backers.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-gray-200 rounded-lg shadow-lg">
                        <FaRocket size={50} className="text-green-600 mb-4" />
                        <h3 className="text-xl font-semibold">Step 3: Launch</h3>
                        <p className="text-gray-700 mt-2">Bring your idea to life with the support of your backers.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
