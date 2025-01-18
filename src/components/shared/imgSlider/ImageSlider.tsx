import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const ImageSlider = ({ images, currentIndex, setCurrentIndex }: any) => {
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex: any) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex: any) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full max-w-lg sm:max-w-full mx-auto hidescroll">
      <div className="overflow-hidden flex items-center hidescroll ">
        {/* Previous Button */}
        <button
          className="bg-[#67043d] rounded-full p-3 shadow-lg focus:outline-none mx-2"
          onClick={handlePrevClick}
        >
          <IconArrowLeft color="white" />
        </button>

        {/* Image Container */}
        <div className="flex-1">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-[26rem] sm:h-full object-fill"
          />
        </div>

        {/* Next Button */}
        <button
          className="bg-[#67043d] rounded-full p-3 shadow-lg focus:outline-none mx-2"
          onClick={handleNextClick}
        >
          <IconArrowRight color="white" />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
