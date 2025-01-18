import React, { useState } from "react";
import {
  FaUser,
  FaBell,
  FaLock,
  FaSignOutAlt,
  FaCog,
  FaShieldAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [isLogoutSheetOpen, setIsLogoutSheetOpen] = useState(false);
  const navigate = useNavigate();
  // Handle Logout Button Click
  const handleLogout = () => {
    setIsLogoutSheetOpen(true); // Open bottom sheet for logout confirmation
  };

  // Handle Confirm Logout
  const confirmLogout = () => {
    console.log("Logout confirmed");
    // Implement your logout logic here (clear session, navigate away, etc.)
    setIsLogoutSheetOpen(false); // Close bottom sheet after logout
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // Handle Cancel Logout
  const cancelLogout = () => {
    setIsLogoutSheetOpen(false); // Close bottom sheet without logging out
  };

  // Handle Delete Account logic
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      console.log("Delete account clicked");
      // Implement account deletion logic here
    }
  };

  return (
    <div className="p-6 mx-w-2xl mx-auto h-screen bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-100 mb-6">
        Settings
      </h1>

      <div className="space-y-4">
        <Link
          to="/profile"
          className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-500 text-lg" />
            <span className="text-gray-100">Account</span>
          </div>
        </Link>

        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
          <div className="flex items-center space-x-3">
            <FaBell className="text-gray-500 text-lg" />
            <span className="text-gray-100">Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="sr-only"
            />
            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-500">
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-5`}
              ></div>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
          <div className="flex items-center space-x-3">
            <FaLock className="text-gray-500 text-lg" />
            <span className="text-gray-100">Privacy</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
          <div className="flex items-center space-x-3">
            <FaShieldAlt className="text-gray-500 text-lg" />
            <span className="text-gray-100">Security</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
          <div className="flex items-center space-x-3">
            <FaCog className="text-gray-500 text-lg" />
            <span className="text-gray-100">Preferences</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              //   checked={darkModeEnabled}
              //   onChange={() => setDarkModeEnabled(!darkModeEnabled)}
              className="sr-only bg-gray-800"
            />
            <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-500">
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-5`}
              ></div>
            </div>
          </label>
        </div>

        <div
          className="flex items-center justify-between p-4 bg-gray-900 rounded-lg cursor-pointer hover:bg-red-100"
          onClick={handleLogout}
        >
          <div className="flex items-center space-x-3">
            <FaSignOutAlt className="text-red-500 text-lg" />
            <span className="text-red-600">Logout</span>
          </div>
        </div>
      </div>
      {isLogoutSheetOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-end z-50"
          onClick={cancelLogout} // Close on clicking outside of the bottom sheet
        >
          <div
            className="bg-black text-white p-6 h-40 rounded-t-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the bottom sheet
          >
            <h3 className="text-center text-xl font-semibold mb-4">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-around">
              <button
                onClick={confirmLogout}
                className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Yes, Logout
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
