import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext/authContext";
import ProfilePicture from "./profilePiture/ProfilePicture";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { RxVideo } from "react-icons/rx";
import { IoCameraOutline } from "react-icons/io5";
// import ContentUpload from "./contentUploadModel/ContentUpload";
import { api } from "../../utils/api";
// import { IoCloudUploadOutline } from "react-icons/io5";
import EditProfileSlider from "./bottomSheetedit/BottomSheet";
import { useNavigate } from "react-router-dom";
import ActivityModal from "../shared/activityModel/ActivityModal";
import { IUser } from "../../@types/interface/user.interface";
import FloatingNavbar from "../shared/floatingNavbar/FloatingNavbar";
import SHareProfile from "../shared/shareProfile/SHareProfile";
import ShareProfile from "../shared/shareProfile/SHareProfile";
import axios from "axios";
import { url } from "../../config/config";

interface MediaPost {
  media_post: string;
}

const Profilepage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState<IUser>();
  const userObjectId = user?._id;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Photos");
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [mediaPosts, setMediaPosts] = useState<MediaPost[]>([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const handleOpenActivityModal = () => {
    setIsActivityModalOpen(true); // Open the Activity modal
  };

  const handleCloseActivityModal = () => {
    setIsActivityModalOpen(false); // Close the Activity modal
  };

  const handleOpenEditProfile = () => {
    setIsEditProfileOpen(true); // Open the bottom sheet
  };

  const handleNavigateEvent = () => {
    navigate("/my-events");
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false); // Close the bottom sheet
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const fetchData = async () => {
    try {
      const contentPayload = { user_id: user?._id };
      const contentResponse = await api.content.getContent(contentPayload);
      setMediaPosts(contentResponse.reverse());

      // console.log(response);
      const userPayload = { userId: user?._id };
      const userResponse = await api.user.getOnlyUser(userPayload);
      setUserDetails(userResponse);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleDeletePost = async () => {
    // alert(`${selectedMedia?._id}`);

    try {
      const payload = {
        content_id: selectedMedia?._id,
      };

      const response = await axios.delete(
        `${url}/api/v1/content/delete-content`,
        { data: payload }
      );

      console.log("Content deleted successfully:", response.data);
      setSelectedMedia(null);
      fetchData();
    } catch (error: any) {
      if (error.response) {
        console.error("Failed to delete content:", error.response.data.message);
      } else {
        console.error("Error while deleting content:", error.message);
      }
    }
  };
  const handleFollowersView = () => {
    navigate(`/users-profile/followers-list?user_id=${userObjectId}`);
  };

  useEffect(() => {
    fetchData();
  }, [user?._id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const payload = { userId: user?._id };
        const response = await api.user.getOnlyUser(payload);
        console.log("Check-->", response);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchUser();
  });

  useEffect(() => {
    if (!user || user === null || user === undefined) {
      navigate("/");
    }
  }, [user, navigate]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the current URL dynamically
  const currentURL =
    "http://localhost:5173/profile?user_id=67444c5a1614df43cec2108a";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link copied to clipboard!");
  };
  console.log("MEdia-->", mediaPosts);

  return (
    <>
      <div className="flex flex-col items-center bg-gray-900 min-h-screen text-white">
        {/* Profile Picture Section */}
        <div className="w-full">
          <ProfilePicture />
        </div>

        {/* User Info Section */}
        <div className="mt-8 text-center w-full px-5">
          <div className="flex justify-between items-start w-full">
            {/* Bio on the left */}
            <div className="w- text-left mt-11">
              {/* <h2 className="text-2xl font-bold text-white">{user?.full_name}</h2> */}
              <p className="text-gray-400">@{user?.user_name}</p>
              <div className="mt-1">
                <p className="text-gray-300 font-semibold">{user?.bio}</p>
              </div>
            </div>

            {/* Followers, Following, Posts on the right */}
            <div className="w-1/3 text-right -mt-5">
              <div className="flex justify-end gap-8">
                <div className="text-center cursor-pointer">
                  <h3 className="text-xl font-semibold">{mediaPosts.length}</h3>
                  <p className="text-gray-400">Posts</p>
                </div>
                <div
                  className="text-center cursor-pointer"
                  onClick={handleFollowersView}
                >
                  <h3 className="text-xl font-semibold">
                    {userDetails?.followers?.length ?? 0}
                  </h3>
                  <p className="text-gray-400">Followers</p>
                </div>
                <div
                  className="text-center cursor-pointer"
                  onClick={handleFollowersView}
                >
                  <h3 className="text-xl font-semibold">
                    {userDetails?.following?.length ?? 0}
                  </h3>
                  <p className="text-gray-400">Following</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Button in the middle */}
          <button
            onClick={handleOpenEditProfile}
            className="bg-gray-800 w-[95%] mt-5 hover:bg-red-500 text-white font-medium py-3 px-6 rounded-lg"
          >
            Edit Profile
          </button>
          <button
            onClick={handleNavigateEvent}
            className="bg-gray-800 w-[95%] mt-5 hover:bg-red-500 text-white font-medium py-3 px-6 rounded-lg"
          >
            My Events
          </button>
          <div className="flex flex-col items-center">
            {/* Button to Open Modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-800 w-[95%] mt-5 hover:bg-red-500 text-white font-medium py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
            >
              Invite People
            </button>

            {isModalOpen && (
              <ShareProfile
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </div>
        </div>

        {/* Navigation (Photos/Videos) with Sliding Tab */}
        <div className="w-full mt-8 flex items-center justify-center">
          <div className="w-80">
            <div className="flex justify-between">
              <button
                onClick={() => setActiveTab("Photos")}
                className={`text-2xl p-2 w-40 justify-center items-center flex ${
                  activeTab === "Photos"
                    ? "text-blue-600 bg-gray-800 rounded-t-xl"
                    : "text-gray-500"
                } hover:text-blue-600 transition-colors`}
              >
                {/* <HiOutlineSquares2X2 /> */}
                <img
                  className="h-8 w-8"
                  src="https://cdn-icons-png.freepik.com/512/14996/14996876.png"
                  alt=""
                />
              </button>
              <button
                onClick={() => setActiveTab("Videos")}
                className={`text-2xl p-2  w-40 justify-center items-center flex ${
                  activeTab === "Videos"
                    ? "text-blue-600 bg-gray-800 rounded-t-xl"
                    : "text-gray-500"
                } hover:text-blue-600 transition-colors`}
              >
                {/* <RxVideo /> */}
                <img
                  className="h-8 w-8"
                  src="https://cdn-icons-png.freepik.com/512/14996/14996818.png"
                  alt=""
                />
              </button>
            </div>
            <div
              className={`w-1/2 h-1.5 bg-[#4d5071] transform transition-transform duration-300 ease-in-out rounded-xl ${
                activeTab === "Photos" ? "translate-x-0" : "translate-x-full"
              }`}
            ></div>
          </div>
        </div>

        {/* Photos or Videos Section */}
        <div className="w-full flex justify-center bg-black min-h-[25rem]">
          {activeTab === "Photos" ? (
            <div className="grid grid-cols-3 gap-4 w-full p-4">
              {/* {mediaPosts.map((media, index) => (
              <div key={index} className="bg-gray-800 h-32">
                <img
                  src={media.media_post}
                  alt=""
                  className="object-cover h-full w-full"
                />
              </div>
            ))} */}
              {mediaPosts?.map((media, index) => (
                <div
                  key={index}
                  className="bg-gray-800 h-32 cursor-pointer rounded-lg"
                  onClick={() => setSelectedMedia(media)} // Set selected media on click
                >
                  <img
                    src={media?.media_post}
                    alt=""
                    className="object-cover h-full w-full rounded-lg"
                  />
                </div>
              ))}

              {/* Modal for viewing photo in larger size */}
              {selectedMedia && (
                <div className="fixed inset-0 h-screen z-50 flex items-center justify-center bg-black bg-opacity-75">
                  {/* Close button */}
                  <button
                    className="absolute top-4 right-4  text-white p-2 rounded-full hover:bg-red-500"
                    onClick={() => setSelectedMedia(null)} // Close modal
                  >
                    <img
                      className="h-10 w-10"
                      src="https://cdn-icons-png.freepik.com/512/14997/14997052.png?ga=GA1.1.1598467923.1731688846"
                      alt=""
                    />
                  </button>
                  <button
                    className="absolute flex items-center gap-2 top-4 right-20  text-white p-2 rounded-full hover:bg-red-500"
                    onClick={handleDeletePost} // Close modal
                  >
                    <img
                      className="h-10 w-10"
                      src="https://cdn-icons-png.freepik.com/512/14997/14997052.png?ga=GA1.1.1598467923.1731688846"
                      alt=""
                    />
                    Delete Post
                  </button>

                  {/* Display the selected photo */}
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={selectedMedia?.media_post}
                      alt="Selected"
                      className="max-w-full max-h-[70vh]"
                    />
                  </div>
                </div>
              )}

              <div
                onClick={() => navigate("/post")}
                className="absolute bottom-24 left-[60%] bg-gray-800 text-white rounded-xl px-8 py-3"
              >
                + Add post
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1 w-full p-4">
              {/* <div className="bg-gray-800 h-32"></div> */}
            </div>
          )}
        </div>

        {/* No Posts Section */}
        <div className="mt-10 flex flex-col items-center gap-2">
          {mediaPosts.length > 0 ? (
            <>
              {/* <div
              className="p-3 rounded-full border border-white"
              // onClick={handleOpenModal}
            >
              <IoCloudUploadOutline size={40} />
            </div>
            <p className="text-gray-400 font-semibold text-lg">Upload More</p> */}
            </>
          ) : (
            <>
              <div
                className="p-3 rounded-full border border-white"
                // onClick={handleOpenModal}
              >
                <IoCameraOutline size={40} />
              </div>
              <p className="text-gray-400 font-semibold text-lg">
                No posts yet
              </p>
            </>
          )}
        </div>

        {/* {isModalOpen && <ContentUpload handleCloseModal={handleCloseModal} />} */}
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay to close the slider */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleCloseEditProfile}
            ></div>

            {/* Edit profile slider */}
            <EditProfileSlider
              isOpen={isEditProfileOpen}
              handleClose={handleCloseEditProfile}
            />
          </div>
        )}

        <ActivityModal
          isOpen={isActivityModalOpen}
          handleClose={handleCloseActivityModal}
          handleLogout={handleLogout}
        />
        <FloatingNavbar />
      </div>
    </>
  );
};

export default Profilepage;
