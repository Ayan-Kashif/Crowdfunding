export default function AboutUs() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Background Image Section */}
      <section
        className="h-[80vh] bg-cover bg-center relative flex items-end"
        style={{ backgroundImage: "url('/gig-img16.webp')" }}
      >
        {/* Rectangular Box Overlapping the Image */}
        <div className="w-11/12 md:w-3/4 lg:w-2/3 bg-blue-600 text-white p-10 py-28 md:p-12 md:py-28 shadow-lg rounded-lg mx-auto absolute bottom-[-10%] left-1/2 transform -translate-x-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Building Dreams, Strengthening Community
          </h1>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-6xl mx-auto mt-40 px-6 space-y-24">
        {/* Our Mission */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <img
            src="/career.png"
            alt="Our Mission"
            className="w-full md:w-[30%] rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 mt-6 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
              We are dedicated to empowering entrepreneurs, businesses, and
              change-makers in the Jewish community. Our goal is to provide a
              platform where great ideas can find the support they need to
              thrive.
            </p>
          </div>
        </div>

        {/* How We Help */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between">
          <img
            src="/customer-service.png"
            alt="How We Help"
            className="w-w-full md:w-[30%] rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 mt-6 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
              How We Help
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
              We provide a secure and intuitive crowdfunding platform that
              connects passionate individuals with investors who believe in
              their vision. From innovative products to community-driven
              projects, we make fundraising simple and effective.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <img
            src="/touch.png"
     
            alt="Why Choose Us"
            className="w-full md:w-[30%] rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 mt-6 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
              Why Choose Us?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
              Our platform is built on trust, transparency, and a commitment to
              helping businesses and projects succeed. We offer seamless
              crowdfunding solutions with robust support at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Spacer to add more height */}
      <div className="h-32"></div>
    </main>
  );
}
