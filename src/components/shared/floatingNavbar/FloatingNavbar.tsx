import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../../contexts/authContext/authContext";
import { useContext } from "react";

const FloatingNavbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const userObjectId = user?._id;

  const handleProfileView = () => {
    navigate(`/profile?user_id=${userObjectId}`);
  };

  const handleHomeView = () => {
    navigate(`/landingpage`);
  };

  const handleSettingsView = () => {
    navigate(`/settings`);
  };

  const handleSearchView = () => {
    navigate(`/search`);
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2
     flex w-8.5/12 max-w-md justify-around bg-gray-800 shadow-lg rounded-full p-1.5"
    >
      {/* Home Button */}
      <button
        onClick={handleHomeView}
        className={`flex flex-col items-center w-20 p-1 rounded-full ${
          location.pathname === "/landingpage"
            ? "bg-gray-700"
            : "hover:bg-gray-600"
        }`}
      >
        <img
          className="h-10 w-10"
          src="https://cdn-icons-png.freepik.com/512/14996/14996901.png"
          alt="Home"
        />
      </button>

      <button
        onClick={handleSearchView}
        className={`flex flex-col items-center w-20 p-1 rounded-full ${
          location.pathname === "/search" ? "bg-gray-700" : "hover:bg-gray-600"
        }`}
      >
        <img
          className="h-10 w-10"
          src="https://cdn-icons-png.freepik.com/512/14997/14997023.png?ga=GA1.1.1598467923.1731688846zas"
          alt="Home"
        />
      </button>

      {/* Profile Button */}
      <button
        onClick={handleProfileView}
        className={`flex flex-col items-center w-20 p-1 rounded-full ${
          location.pathname === "/profile" ? "bg-gray-700" : "hover:bg-gray-600"
        }`}
      >
        <img
          className="h-10 w-10"
          src="https://cdn-icons-png.freepik.com/512/14996/14996907.png"
          alt="Profile"
        />
      </button>

      {/* Settings Button */}
      {/* <button
        onClick={handleSettingsView}
        className={`flex flex-col items-center w-20 p-1 rounded-full ${
          location.pathname === "/settings" ? "bg-gray-700" : "hover:bg-gray-600"
        }`}
      >
        <img
          className="h-10 w-10"
          src="https://cdn-icons-png.freepik.com/512/14997/14997015.png"
          alt="Settings"
        />
      </button> */}
    </div>
  );
};

export default FloatingNavbar;
