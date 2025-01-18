import React, { useState } from "react";
import FloatingNavbar from "../shared/floatingNavbar/FloatingNavbar";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
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
    <div className="flex flex-col bg-gray-900 min-h-screen text-white p-6">
      {/* Page Header */}
      <h1 className="text-center text-xl font-semibold mb-8">Settings</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-500 text-white font-medium py-3 px-6 rounded-lg mb-4"
      >
        Logout
      </button>

      {/* Delete Account Button */}
      <button
        onClick={handleDeleteAccount}
        className="bg-gray-700 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg"
      >
        Delete Account
      </button>

      {/* Floating Navbar */}
      <FloatingNavbar />

      {/* Bottom Sheet for Logout Confirmation */}
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

export default SettingsPage;
