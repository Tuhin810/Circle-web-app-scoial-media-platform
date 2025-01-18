import { useState } from "react";
import ImageSlider from "../shared/imgSlider/ImageSlider";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

const Body = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img2, img3, img1, img2, img3];
  const categories = [
    "Entertianment Enclave",
    "Entertianment Enclave",
    "Fashion Fusion",
    "Wellness Oasis",
    " Adventure Ave.",
    "Spicy Showcase",
  ];

  return (
    <div>
      <div className="mx-auto flex justify-center py-1 font-extrabold text-[#67043d]">
        {categories[currentIndex]}
      </div>
      <ImageSlider
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default Body;
