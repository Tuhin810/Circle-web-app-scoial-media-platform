import React, { useCallback, useContext, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import AuthContext from "../../../contexts/authContext/authContext";
import { api } from "../../../utils/api";
import ImageUploadModal from "../editProfileModels/ImageUploadModals";
import SelectionModel from "../selectionModel/SelectionModel";

interface EditSliderProps {
  handleClose: () => void;
  isOpen: boolean;
}

const EditProfileSlider: React.FC<EditSliderProps> = ({
  handleClose,
  isOpen,
}) => {
  const { user } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [showWhichPhotoModal, setShowWhichPhotoModal] =
    useState<boolean>(false);
  const [isProfileUpload, setIsProfileUpload] = useState<boolean>(true);
  // States for username and bio
  const [username, setUsername] = useState(user?.user_name || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleEditProfileDetails = useCallback(async () => {
    const payload = {
      userObjectId: user._id,
      userDetails: {
        user_name: username,
        bio: bio,
      },
    };
    const response = await api.user.editUserProfileDetails(payload);
    if (response) {
      // handleClose();
      console.log("User details updated successfully");
      setUser(response);
      // window.location.reload();
    }
  }, [bio, setUser, user._id, username]);

  const handleProfileEditClick = () => {
    setShowWhichPhotoModal(true);
  };

  const closeModal = () => {
    setShowProfileModal(false);
    setShowCoverModal(false);
    setUploadImage(null);
  };

  const handlePhotoSelection = (photoType: "profile" | "cover") => {
    if (photoType === "profile") {
      setIsProfileUpload(true);
      setShowProfileModal(true);
    } else {
      setIsProfileUpload(false);
      setShowCoverModal(true);
    }
    setShowWhichPhotoModal(false); // Close the selection modal
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      if (uploadImage) {
        if (isProfileUpload) {
          formData.append("user_profile_image", uploadImage);
        } else {
          formData.append("user_cover_image", uploadImage);
        }
      }
      if (user?._id) {
        console.log("user_ID", user._id);
        formData.append("userObjectId", user._id);
      }

      const response = await api.user.uploadProfileCoverPicture(formData);

      if (response) {
        // Create the updated user object
        const updatedUser = {
          ...user,
          profile_image: response.profile_image,
          cover_image: response.cover_image,
        };

        setUser(updatedUser);
        console.log("SET USER", updatedUser);
        setShowProfileModal(false);
        setShowCoverModal(false);
        closeModal();
      }
    } catch (error) {
      console.log("Error in the image upload", error);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-full h-full bg-black text-white  shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex bg-gray-800 flex-row items-center gap-2 pl-5 py-3 items-center">
          <button onClick={handleClose} className="mr-2">
            {/* <IoMdArrowRoundBack /> */}
            <img className="h-8 w-8" src="https://cdn-icons-png.freepik.com/512/14997/14997052.png" alt="" />
          </button>

          <h2 className="text-xl font-semibold flex justify-center">
            Edit Profile
          </h2>
        </div>

        {/* Profile edit section */}
        <div className="px-5">
          <div className="border border-t-0 border-gray-700 mb-3 w-full opacity-60"></div>
          <div
            className="flex flex-col px-5 items-center bg-cover bg-center"
            style={{
              backgroundImage: user?.cover_image && `url(${user.cover_image})`,
            }}
          >
            <div className="mt-20">
              <img
                src={
                  user?.profile_image ||
                  "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                }
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-gray-100 object-cover"
              />
            </div>
          </div>
          <button
            className="mt-2 text-blue-400 mx-auto block"
            onClick={handleProfileEditClick}
          >
            Edit Picture
          </button>

          <div className="border border-b-0 border-gray-700 mb-3 mt-2 w-full opacity-60"></div>
        </div>

        {/* Edit username and bio sections like Instagram */}
        <div className="mt-4 px-5 flex flex-col gap-4">
          {/* Username Input */}
          <div>
            <label className="text-sm text-gray-400">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 border-b border-gray-800 rounded-xl px-2 py-3 text-white outline-none focus:border-blue-500"
              placeholder="Username"
            />
          </div>

          {/* Bio Input */}
          <div>
            <label className="text-sm text-gray-400">Bio</label>
            <input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-gray-700 border-b border-gray-800 rounded-xl px-2 py-3 text-white outline-none focus:border-blue-500 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="mt-6 mx-5">
          <button
            onClick={handleEditProfileDetails}
            className="w-full bg-[#535678] px-2 py-3 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>

      {showWhichPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85">
          <SelectionModel handlePhotoSelection={handlePhotoSelection} />
        </div>
      )}

      <ImageUploadModal
        title="Upload Profile Picture"
        isOpen={showProfileModal}
        onClose={closeModal}
        onUpload={handleUploadImage}
        setUploadImage={setUploadImage}
      />

      <ImageUploadModal
        title="Upload Cover Picture"
        isOpen={showCoverModal}
        onClose={closeModal}
        onUpload={handleUploadImage}
        setUploadImage={setUploadImage}
      />
    </>
  );
};

export default EditProfileSlider;
