import React, { useContext, useState } from "react";
import {
  FaUser,
  FaBell,
  FaLock,
  FaSignOutAlt,
  FaCog,
  FaShieldAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext/authContext";

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
  const { user } = useContext(AuthContext);
  return (
    <div className="pt-5 mx-w-2xl mx-auto h-screen bg-black rounded-lg shadow-md">
      <div className="flex justify-between  items-center px-4 pb-5">
        <h2
          className="text-white text-2xl font-bold ml-2 t font-bold text-2xl leading-tight flex gap-2"
          // style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {/* <GrAd className="text-[#d8fc5f]" /> */}
          Settings
        </h2>
        {/* <Link to={"/profile"}>
          <img
            src={
              user?.profile_image ||
              "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full  object-cover"
          />
        </Link> */}
      </div>

      <div className="space-y-4 px-5">
        <Link
          to="/profile"
          className="flex items-center -ml-2 px-3 py-2 rounded-[1.3rem] backdrop-blur bg-white/10 border border-white/10
                         shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-lg font-medium"
        >
          <div className="flex items-center space-x-3">
            <Link to={"/profile"}>
              <img
                src={
                  user?.profile_image ||
                  "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full  object-cover"
              />
            </Link>
            <div className="flex flex-col">
              <span className="text-gray-100">{user?.full_name}</span>
              <span className="text-gray-500 text-xs">@{user?.user_name}</span>
            </div>
          </div>
        </Link>

        <div
          className="flex items-center -ml-2 px-3 py-2 rounded-[1.3rem] backdrop-blur bg-white/10 border border-white/10
                         shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-lg font-medium"
        >
          <div className="flex items-center space-x-3">
            <FaBell className="text-gray-500 text-lg" />
            <span className="text-gray-100">Notifications</span>
          </div>
          <label className="relative ml-auto inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="sr-only bg-black"
            />
            <div className="w-10 h-4 bg-gray-500 rounded-full peer peer-checked:bg-green-500">
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform peer-checked:translate-x-5`}
              ></div>
            </div>
          </label>
        </div>
        <div className="flex h-56 justify-center gap-5">
          <div
            className=" w-[47%] items-center -ml-2 px-3 py-4 rounded-[1.3rem] backdrop-blur bg-[#d8fc5f] border border-white/10
                         shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-lg font-medium"
          >
            <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-black">
              <FaLock className="text-white text-lg" />
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-black text-sm">
                We ensure your confidential data, and protect against
                unauthorized access.
              </span>
            </div>
          </div>

          <div
            className=" w-[47%] items-center -ml-2 px-3 py-4 rounded-[1.3rem] backdrop-blur bg-[#d3b5fe] border border-white/10
                         shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-lg font-medium"
          >
            <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-black">
              <FaShieldAlt className="text-white text-lg" />
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-black text-sm">
                We prioritize safeguarding your data to prevent unauthorized
                access
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex items-center -ml-2 px-3 py-2 rounded-[1.3rem] backdrop-blur bg-white/10 border border-white/10
                         shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-lg font-medium"
        >
          <div className="flex items-center space-x-3">
            <FaCog className="text-gray-500 text-lg" />
            <span className="text-gray-100">Preferences</span>
          </div>
        </div>

        <div
          className="flex items-center -ml-2 px-3 py-2 rounded-[1.3rem] backdrop-blur bg-white/10 border border-white/10
                         shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-lg font-medium"
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
                className="bg-red-600 hover:bg-red-500 text-white py-3 px-6 rounded-full"
              >
                Yes, Logout
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-full"
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
