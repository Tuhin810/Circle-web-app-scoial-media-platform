import React from "react";

const ChatPage = () => {
  return (
    <div className="bg-black text-white h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50" // Replace with profile image URL
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-lg font-bold">Kate 27 🔥</h2>
            <p className="text-sm text-gray-400">
              Hey there! My name is Kate and I'm a designer. I love exploring
              new places...
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 bg-gray-800 rounded-full">
            <i className="fas fa-phone-alt"></i>{" "}
            {/* Replace with Tabler Icons */}
          </button>
          <button className="p-2 bg-gray-800 rounded-full">
            <i className="fas fa-video"></i> {/* Replace with Tabler Icons */}
          </button>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Received Message */}
        <div className="flex items-start space-x-3">
          <img
            src="https://via.placeholder.com/40" // Replace with sender profile image
            alt="Kate"
            className="w-10 h-10 rounded-full"
          />
          <div className="bg-gray-800 p-3 rounded-lg">
            <p>Hi John! Yes, it excites me! You?</p>
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex items-end justify-end space-x-3">
          <div className="bg-green-600 p-3 rounded-lg text-right">
            <p>Yep! Ever tried scuba diving?</p>
          </div>
        </div>

        {/* Received Message */}
        <div className="flex items-start space-x-3">
          <img
            src="https://via.placeholder.com/40" // Replace with sender profile image
            alt="Kate"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p>Totally! It's my passion 🐠</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg mt-2">
              <p>You should try it</p>
              <img
                src="https://via.placeholder.com/50" // Replace with image URL
                alt="Sticker"
                className="mt-2 w-10 h-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Message"
          className="flex-1 bg-gray-800 p-3 rounded-full text-white outline-none"
        />
        <button className="p-3 bg-green-600 rounded-full">
          <i className="fas fa-paper-plane"></i>{" "}
          {/* Replace with Tabler Icons */}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
