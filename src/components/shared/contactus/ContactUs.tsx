import React from "react";

const ContactUs = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/uploads/1413222992504f1b734a6/1928e537?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="max-w-lg w-full bg-black rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-pink-500 text-center mb-4">
          21xConnect
        </h1>
        <h2 className="text-xl font-semibold text-white text-center mb-8">
          We are here for you 24/7
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:ring-pink-500 focus:border-pink-500 border-gray-600"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:ring-pink-500 focus:border-pink-500 border-gray-600"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:ring-pink-500 focus:border-pink-500 border-gray-600"
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
