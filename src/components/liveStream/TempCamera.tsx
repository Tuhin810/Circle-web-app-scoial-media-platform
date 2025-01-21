import React from "react";
import { GrAd } from "react-icons/gr";

const TempCamera = ({ startBroadcast }: any) => {
  return (
    <div>
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <div className="flex justify-between   px-4 py-3">
          <h2
            className="text-white text-2xl font-bold ml-2 t font-bold text-2xl leading-tight flex gap-2"
            // style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            <GrAd className="text-[#d8fc5f]" />
            Circle
          </h2>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-center h-full text-start text-white px-4">
          <h1 className="text-4xl font-bold mb-4">
            SHOW THE SECRET OF YOUR HAPPINESS
          </h1>
          <p className="text-lg mb-8 text-start">
            get your enjoy quickly and easily
          </p>
          <div
            onClick={startBroadcast}
            className="px-8 py-3 bg-[#d8fc5f] text-center text-black font-semibold rounded-full text-lg"
          >
            GET STARTED
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempCamera;
