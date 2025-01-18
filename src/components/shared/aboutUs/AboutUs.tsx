import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-20" id="about">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-800">
            Welcome To <span className="text-green-500">Lorem Ipsum</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
            <br />
            Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center mt-12">
          {/* Text Content */}
          <div className="lg:w-1/2 lg:pr-8">
            <div className="mb-8">
              <p className="text-green-500 font-semibold">
                Lorem Ipsum is simply dummy text
              </p>
              <h4 className="text-2xl font-bold mt-4">
                Lorem Ipsum is simply dummy text of the printing industry.
              </h4>
              <p className="text-gray-600 mt-4">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </p>
              <p className="text-gray-600 mt-4">
                Richard McClintock, a Latin professor at Hampden-Sydney College
                in Virginia, looked up one of the more obscure Latin words,
                consectetur, from a Lorem Ipsum passage.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2">
            <div className="mt-8 lg:mt-0">
              <img
                src="https://i.ibb.co/qpz1hvM/About-us.jpg"
                alt="About Us"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-white p-4 rounded-full shadow-lg text-green-500">
                <i className="fas fa-pencil-alt text-xl"></i>
              </div>
            </div>
            <h5 className="text-lg font-semibold text-gray-800">
              Creative Design
            </h5>
            <p className="text-gray-600 mt-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-white p-4 rounded-full shadow-lg text-green-500">
                <i className="fab fa-angellist text-xl"></i>
              </div>
            </div>
            <h5 className="text-lg font-semibold text-gray-800">
              We make Best Result
            </h5>
            <p className="text-gray-600 mt-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-white p-4 rounded-full shadow-lg text-green-500">
                <i className="fas fa-paper-plane text-xl"></i>
              </div>
            </div>
            <h5 className="text-lg font-semibold text-gray-800">
              Best Platform
            </h5>
            <p className="text-gray-600 mt-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
