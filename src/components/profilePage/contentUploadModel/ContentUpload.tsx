import React, { useCallback, useContext, useEffect, useState } from "react";
import { api } from "../../../utils/api";
import AuthContext from "../../../contexts/authContext/authContext";
import { Link, useNavigate } from "react-router-dom";
import FloatingNavbar from "../../shared/floatingNavbar/FloatingNavbar";
import { IoCloudUploadOutline, IoReturnUpBack } from "react-icons/io5";

const ContentUpload = () => {
  const { user } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const [mediaContentDetails, setMediaContentDetails] = useState({
    user_id: user?.id,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMediaContentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      console.log("Selected file:", file);
      setSelectedImage(file);
    }
  };

  const handleCloseModal = () => {
    navigate("/landingpage");
  };

  const handleContentUpload = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      if (!selectedImage) {
        console.error("No image selected for upload");
        return; // Prevent upload if no image is selected
      }

      try {
        const formData = new FormData();
        formData.append(
          "mediaContentDetails",
          JSON.stringify(mediaContentDetails)
        );
        formData.append("media_post", selectedImage);

        const response = await api.content.contentCreation(formData);
        if (response) {
          navigate("/profile");
          // window.location.reload();
          console.log("Media uploaded successfully:", response);
        }
      } catch (error) {
        console.error("Error uploading media:", error);
      } finally {
        setLoading(false);
      }
    },
    [mediaContentDetails, navigate, selectedImage]
  );

  const handleNavigateBack = () => {
    navigate(-1); // Go back to previous page
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(URL.createObjectURL(selectedImage));
      }
    };
  }, [selectedImage]);

  return (
    <>
      <div className="min-h-screen pt-5  bg-black">
        <div className="flex justify-between space-x-3 px-5">
          <div
            onClick={handleNavigateBack}
            className="flex items-center -ml-2 px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                                     shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-sm font-medium"
          >
            <IoReturnUpBack
              size={22}
              className="text-[#d8fc5f] font-extrabold mr-1"
            />{" "}
            Back
          </div>
        </div>
        <div className="text-gray-200 text-4xl w-48 ml-5 my-5">
          Lets share what you think?
        </div>
        <div className=" rounded-lg p-6 w-full max-w-2xl -mt-5">
          <form onSubmit={handleContentUpload} className="space-y-4">
            <div className="font-semibold text-gray-200">Select Image </div>
            <div className="flex flex-col items-center border-2 border-dashed  backdrop-blur bg-white/10 border border-white/10 py-10 rounded-2xl transition">
              <label htmlFor="postImage" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <IoCloudUploadOutline
                    size={40}
                    className="text-[#d8fc5f] font-extrabold mr-1"
                  />
                  <span className="mt-2 text-sm text-gray-400">
                    Click to upload an image
                  </span>
                </div>
              </label>
              <input
                onChange={handleFileChange}
                id="postImage"
                type="file"
                className="hidden"
                accept="image/*"
              />
              <img
                id="imagePreview"
                className="mt-4 max-h-40 rounded-lg hidden"
                alt="Preview"
              />
            </div>
            {selectedImage && (
              <div className="mb-4 relative">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Preview"
                  className="w-full h-48 object-cover rounded-md border border-white"
                />
                <button
                  type="button" // Use type button to prevent form submission
                  className="absolute top-2 right-2 bg-white text-black rounded-full px-1"
                  onClick={() => setSelectedImage(null)}
                >
                  ✖
                </button>
              </div>
            )}
            <div>
              <label
                htmlFor="caption"
                className="block text-sm font-medium text-gray-200 mb-3"
              >
                Caption
              </label>
              <input
                type="text"
                name="description"
                placeholder="Write a caption..."
                value={mediaContentDetails.description}
                onChange={handleChange}
                className="w-full h-12 rounded-full backdrop-blur bg-white/10 border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.02)]0"
              />
            </div>
            {loading ? (
              <button
                className="inline-flex items-center justify-center w-full px-5 py-4 text-sm font-semibold
  tracking-widest text-black uppercase transition-all duration-200 bg-[#d8fc5f] rounded-full 
  sm:w-auto sm:py-3 hover:opacity-90"
              >
                Uploading your image..
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-5 py-4 text-sm font-semibold
tracking-widest text-black uppercase transition-all duration-200 bg-[#d8fc5f] rounded-full 
sm:w-auto sm:py-3 hover:opacity-90"
              >
                Post
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ContentUpload;
