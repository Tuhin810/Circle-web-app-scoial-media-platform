/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import AuthContext from "../../../contexts/authContext/authContext";

const LoginBtn = () => {
  const { setUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsClicked(true);
    try {
      const payload = {
        userId: username,
        password,
      };
      const response = await api.auth.userLogin(payload);
      if (response) {
        setUser(response);
        navigate("/landingpage");
      }
      console.log(response);
    } catch (error) {
      setError("Invalid username or password");
      setIsClicked(false);
    }
  };

  return (
    <>
      <div
        className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold
        tracking-widest text-black uppercase transition-all duration-200 bg-[#d8fc5f] rounded-full 
        sm:w-auto sm:py-3 hover:opacity-90"
        onClick={toggleModal}
      >
        Login
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
          onClick={toggleModal} // Close modal on overlay click
        >
          <div
            className="bg-gray-900 relative rounded-t-[2rem] shadow-lg p-8 w-full max-w-lg animate-slide-up"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            {/* <button
              className="absolute top-2 right-2 text-gray-500 px-2 py-1 rounded-full"
              onClick={toggleModal}
            >
              &times; close
            </button> */}
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Welcome Back
            </h2>

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-gray-200 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full px-3 py-4 border text-white rounded-full bg-gray-800 outline-none border-none focus:outline-none focus:border-blue-500"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-200 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-3 py-4 border rounded-full text-white bg-gray-800 outline-none border-none focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div
                onClick={handleLogin}
                className={`bg-[#d8fc5f] text-black font-semibold text-center px-4 py-3 text-xl rounded-full w-full ${
                  isClicked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isClicked ? "Logging in..." : "Continue"}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginBtn;
