import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext/authContext";
import ProfilePicture from "./profilePiture/ProfilePicture";
import { api } from "../../utils/api";
import EditProfileSlider from "./bottomSheetedit/BottomSheet";
import { useNavigate } from "react-router-dom";
import ActivityModal from "../shared/activityModel/ActivityModal";
import { IUser } from "../../@types/interface/user.interface";
import ShareProfile from "../shared/shareProfile/SHareProfile";
import axios from "axios";
import { url } from "../../config/config";
import MobileNavigation from "../shared/floatingNavbar/MobileNavigation";
import MediaPosts from "./mideaPosts/MediaPosts";

interface MediaPost {
  media_post: string;
}

const Profilepage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState<IUser>();
  const userObjectId = user?._id;
  const navigate = useNavigate();
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [mediaPosts, setMediaPosts] = useState<MediaPost[]>([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const handleCloseActivityModal = () => {
    setIsActivityModalOpen(false); // Close the Activity modal
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

  // const handleDeletePost = async () => {
  //   // alert(`${selectedMedia?._id}`);

  //   try {
  //     const payload = {
  //       content_id: selectedMedia?._id,
  //     };

  //     const response = await axios.delete(
  //       `${url}/api/v1/content/delete-content`,
  //       { data: payload }
  //     );

  //     console.log("Content deleted successfully:", response.data);
  //     setSelectedMedia(null);
  //     fetchData();
  //   } catch (error: any) {
  //     if (error.response) {
  //       console.error("Failed to delete content:", error.response.data.message);
  //     } else {
  //       console.error("Error while deleting content:", error.message);
  //     }
  //   }
  // };
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

  return (
    <>
      <div className="flex flex-col items-center bg-black min-h-screen text-white">
        <div className="w-full">
          <ProfilePicture
            posts={mediaPosts.length}
            followers={userDetails?.followers?.length ?? 0}
            handleFollowersView={handleFollowersView}
            following={userDetails?.following?.length ?? 0}
            setIsModalOpen={setIsModalOpen}
          />
        </div>

        <div className="flex w-full px-3 gap-4 my-5">
          <div
            onClick={() => navigate("/post")}
            className="inline-flex items-center justify-center w-full px-5 py-4 text-sm font-semibold
        tracking-widest text-black uppercase transition-all duration-200 bg-[#d8fc5f] rounded-full 
        sm:w-auto sm:py-3 hover:opacity-90"
          >
            Add Posts
          </div>
          <div
            onClick={handleNavigateEvent}
            className="inline-flex items-center justify-center w-full px-5 py-4 text-sm font-semibold
        tracking-widest text-black uppercase transition-all duration-200 bg-[#d8fc5f] rounded-full 
        sm:w-auto sm:py-3 hover:opacity-90"
          >
            Add Event
          </div>
        </div>

        {isModalOpen && (
          <ShareProfile
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        <MediaPosts
          mediaPosts={mediaPosts}
          setSelectedMedia={setSelectedMedia}
        />

        {isEditProfileOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="absolute inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleCloseEditProfile}
            ></div>

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
      </div>
    </>
  );
};

export default Profilepage;
