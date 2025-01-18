/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaHeart } from "react-icons/fa";

const ImageCard = ({ img, likes }: any) => {
  return (
    <div className="relative w-full h-auto mt-2 rounded-[1.5rem] overflow-hidden">
      {/* Image */}
      <img src={img} alt="Post" className="w-full h-full object-cover" />

      {/* Glassmorphism Overlay */}
      <div className="absolute top-2 right-2 flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur bg-white/10 border border-white/5">
        <span className="flex items-center text-white text-sm font-medium gap-1">
          <FaHeart />
          {likes}
        </span>
      </div>
    </div>
  );
};

export default ImageCard;
