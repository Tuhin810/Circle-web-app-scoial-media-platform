import { useContext } from "react";
// import { IconEdit } from "@tabler/icons-react";
import AuthContext from "../../../contexts/authContext/authContext";
// import { api } from "../../../utils/api";
// import ImageUploadModal from "../editProfileModels/ImageUploadModals";

const ProfilePicture = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="relative">
        <img
          src={
            user?.cover_image ||
            "https://www.acemetrix.com/wp-content/themes/acemetrix/images/default/default-black-banner.png"
          }
          alt="Background"
          className="w-full h-32 object-cover"
        />
        {/* <div
          className="absolute bottom-2 right-2 bg-blue-500  text-white p-1 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
          onClick={handleCoverEditClick}
        >
          <IconEdit size={20} />
        </div> */}
      </div>

      {/* Profile Picture with Edit Icon */}
      <div className="relative">
        <div className="absolute -bottom-16 left-14 transform -translate-x-1/2">
          <img
            src={
              user?.profile_image ||
              "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-gray-100 object-cover"
          />
          {/* <div
            className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
            onClick={handleProfileEditClick}
          >
            <IconEdit size={20} />
          </div> */}
        </div>
      </div>

      {/* <ImageUploadModal
        title="Upload Profile Picture"
        isOpen={showProfileModal}
        onClose={closeModal}
        onUpload={handleUploadImage}
        setUploadImage={setUploadImage}
      /> */}

      {/* <ImageUploadModal
        title="Upload Cover Picture"
        isOpen={showCoverModal}
        onClose={closeModal}
        onUpload={handleUploadImage}
        setUploadImage={setUploadImage}
      /> */}
    </>
  );
};

export default ProfilePicture;
