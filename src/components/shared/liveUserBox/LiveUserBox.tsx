import React from "react";
import { demoProfileImage } from "../../../constants/dummyContent/DummyExamples";
import { useNavigate } from "react-router-dom";

const LiveUserBox = ({ stream }: any) => {
  const navigate = useNavigate();

  const handleWatchStream = () => {
    navigate(`/live-stream/${stream?.room_Id}`);
  };

  return (
    <div
      onClick={handleWatchStream}
      className="flex flex-col items-center min-w-max relative"
    >
      <img
        src={stream?.broadcaster?.profile_image}
        alt="Profile"
        className="rounded-full w-16 h-16 border-2 border-[#707195] bg-gray-500 object-cover"
      />

      <img
        className="h-10 w-10 -mt-6"
        src="https://cdn-icons-png.freepik.com/512/5822/5822037.png?ga=GA1.1.1598467923.1731688846"
        alt="Live Label"
      />

      <span className="text-xs -mt-1 text-gray-200">
        {stream?.broadcaster?.user_name}
      </span>
    </div>
  );
};

export default LiveUserBox;
