import React, { useCallback, useContext, useEffect, useState } from "react";
import { api } from "../../../utils/api";
import AuthContext from "../../../contexts/authContext/authContext";
import { useNavigate } from "react-router-dom";
import FloatingNavbar from "../../shared/floatingNavbar/FloatingNavbar";

const ContentUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { user } = useContext(AuthContext);
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
      {/* <div className="fixed inset-0 flex items-center justify-center bg-black h-screen">
        <h2 className="text-white text-lg font-semibold mb-4">Create a Post</h2>

        <form onSubmit={handleContentUpload} className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="text-white mb-5 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
          />
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

          <div className="mb-4">
            <input
              type="text"
              name="description"
              placeholder="Write a caption..."
              value={mediaContentDetails.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black bg-opacity-75 text-blue-200 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md"
            >
              Share
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-md"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </form>
    </div> */}
      <div className="min-h-screen flex  bg-gray-900">
        <div className=" rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-white flex gap-2 mb-10">
            <div className="" onClick={handleNavigateBack}>
              <img
                className="h-8 w-8"
                src="https://cdn-icons-png.freepik.com/512/14997/14997052.png"
                alt=""
              />
            </div>
            Create a Post
          </h2>
          {/* <div className="mb-4 mb-10 text-gray-300 pl-10">Upload a image and  a caption for your post</div> */}
          <form onSubmit={handleContentUpload} className="space-y-4">
            {/* Image Upload Section */}
            <div className="font-semibold text-gray-200">Select Image </div>
            <div className="flex flex-col items-center border-2 border-dashed border-gray-300 p-4 rounded-lg hover:border-blue-500 transition">
              <label htmlFor="postImage" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
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
            {/* Caption Input */}
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
                className="w-full bg-gray-700 rounded-lg border-gray-800 text-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#535678] text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Post
            </button>
          </form>
        </div>
      </div>
      <FloatingNavbar />
    </>
  );
};

export default ContentUpload;
