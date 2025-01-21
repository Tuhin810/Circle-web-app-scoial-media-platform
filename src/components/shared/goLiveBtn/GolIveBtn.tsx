import React, { useContext } from "react";
import AuthContext from "../../../contexts/authContext/authContext";
import { FaPlay, FaPlayCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";

const GolIveBtn = ({ onpress }: any) => {
  const { user } = useContext(AuthContext);

  const handleGoLiveClick = async () => {
    try {
      // Request media devices permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // If successful, release the stream and navigate
      stream.getTracks().forEach((track) => track.stop());
      onpress(); // Call the navigation function
    } catch (error) {
      // If permissions are denied, show an alert
      alert("Please allow access to the camera and microphone to proceed.");
    }
  };

  return (
    <div
      className="flex relative gap-2 flex-col items-center min-w-max"
      onClick={handleGoLiveClick}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${user?.profile_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative bg-gray-900 rounded-full w-16 h-16 object-cover flex items-center justify-center"
      >
        <div className="absolute -bottom-0 flex items-center bg-[#d8fc5f] h-4 justify-center pr-1 rounded-full">
          <div className="p-0.5 bg-[#d8fc5f] text-white rounded-full">
            <FaCirclePlay size={18} className="text-xs text-black" />
          </div>
          {/* Text */}
          <span className="text-xs font-semibold text-black">LIVE</span>
        </div>
        {/* <img
          className="absolute -bottom- h-12 w-12"
          src="https://cdn-icons-png.freepik.com/512/5822/5822037.png?ga=GA1.1.1598467923.1731688846"
          alt=""
        /> */}
      </div>
      <span className="text-xs mt-1 text-gray-200">Go Live</span>
    </div>
  );
};

export default GolIveBtn;
