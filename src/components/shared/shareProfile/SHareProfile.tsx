import React from "react";
import {
  FaWhatsapp,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaCopy,
} from "react-icons/fa";

const ShareProfile = ({ setIsModalOpen }: any) => {
  const currentURL = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-[90%] max-w-md p-6 relative animate-fadeIn">
        {/* Heading */}
        <h2 className="text-lg font-bold mb-4 text-gray-100">Invite People</h2>

        {/* Social Icons Row */}
        <div className="flex justify-center gap-8 items-center mb-6">
          <a
            href={`https://www.instagram.com/share?url=${encodeURIComponent(
              currentURL
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 text-2xl transition"
          >
            <FaInstagram />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentURL
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 text-2xl transition"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
              currentURL
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 text-2xl transition"
          >
            <FaLinkedin />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              currentURL
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-600 text-2xl transition"
          >
            <FaWhatsapp />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentURL
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-2xl transition"
          >
            <FaFacebookF />
          </a>
        </div>

        {/* Copy Link Section */}
        <div>
          <p className="text-gray-600 mb-2">Or copy link</p>
          <div className="flex items-center border border-gray-900 rounded-lg overflow-hidden">
            <input
              type="text"
              value={currentURL}
              readOnly
              className="flex-grow px-4 py-3 text-gray-100 bg-gray-700 border-none focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="bg-gray-800 px-4 py-4 hover:bg-gray-600 transition"
            >
              <FaCopy className="text-gray-700 text-lg" />
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl transition"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ShareProfile;
