import { IconMessageCircleFilled, IconUserFilled } from "@tabler/icons-react";
import logo from "../../../assets/logo.png";
import LoginBtn from "../loginBtn/LoginBtn";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      {/* Top Header */}
      <div className="bg-pink-100 text-center py-2 text-xl font-semibold flex justify-center items-center gap-2">
        <span>A NEW ADULT SOCIAL MEDIA PLATFORM</span>
        <IconUserFilled size={20} className="text-pink-600" />
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto py-4 px-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Logo and Login */}
        <div className="flex items-center gap-6">
          <img className="h-20 w-24 object-contain" src={logo} alt="Logo" />
          <LoginBtn />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-4 sm:mt-0">
          <a
            href="/creator-signup"
            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white font-medium transition duration-300"
          >
            Join as a Creator
          </a>
          <a
            href="/visitor-signup"
            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white font-medium transition duration-300"
          >
            Join as a Visitor
          </a>
        </div>

        {/* Chat and Tagline Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-4 sm:mt-0">
          <div className="flex items-center gap-2 text-pink-600 font-medium">
            <IconMessageCircleFilled size={20} />
            <span>With Live Chat</span>
          </div>
          <div
            className="text-center sm:text-left text-pink-800 font-bold text-2xl leading-tight"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Adult Connect &<br /> Make Money
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
