import React from "react";

const GolIveBtn = ({ onpress }: any) => {
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
      <div className="bg-black rounded-full w-16 h-16 border-2 border-[#707195] object-cover flex items-center justify-center">
        <img
          className="h-12 w-12"
          src="https://cdn-icons-png.freepik.com/512/5822/5822037.png?ga=GA1.1.1598467923.1731688846"
          alt=""
        />
      </div>
      <span className="text-xs mt-1 text-gray-200">Go Live</span>
    </div>
  );
};

export default GolIveBtn;
