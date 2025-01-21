/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const MediaPosts = ({ mediaPosts, setSelectedMedia }: any) => {
  return (
    <div className="w-full flex justify-center bg-black min-h-[25rem] px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {mediaPosts?.map((media, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer rounded-[1.4rem] overflow-hidden ${
              index % 2 === 0 ? "h-72" : "h-56"
            }`} // Odd cards are shorter, even cards are taller
          >
            {/* Media Image */}
            <img
              src={media?.media_post}
              alt=""
              className="object-cover w-full h-full"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            {/* Title */}
            <div className="absolute bottom-4 left-4 text-white text-lg font-bold ">
              {media?.description || "Default Title"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaPosts;
