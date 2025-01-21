import React, { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { IUser } from "../../@types/interface/user.interface";
import AuthContext from "../../contexts/authContext/authContext";
import { useNavigate } from "react-router-dom";
import OtherProfilePicture from "../profilePage/profilePiture/OtherProfile";
import MediaPosts from "../profilePage/mideaPosts/MediaPosts";

interface MediaPost {
  media_post: string;
}

const FollowersProfilePage: React.FC = () => {
  const query = new URLSearchParams(window.location.search);
  const userObjectId = query.get("user_id");
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser>();
  const [content, setContent] = useState<MediaPost[]>([]);
  const [followersDetails, setFollowersDetails] = useState<string[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const payload = { userObjectId };
        console.log("Payload--->", payload);
        const response = await api.user.getUserDetailsWithContent(payload);
        // setMediaPosts(response);
        setUsers(response.user);
        setContent(response.content.reverse());
        setFollowersDetails(response.user.followers);
        // console.log("Response --->", setContent);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [userObjectId]);

  const handleFollow = async () => {
    const followerId = user._id;
    const payload = { userObjectId, followerId };
    try {
      const response = await api.user.followUser(payload);
      // Update the followersDetails after successfully following
      setFollowersDetails((prevFollowers) => [...prevFollowers, followerId]);
      console.log("Follower-response", response);
    } catch (error) {
      console.log("Error while following user:", error);
    }
  };
  // console.log("Content --->", content);
  const isFollowing = followersDetails.includes(user._id);

  const handleViewFOllowers = () => {
    navigate(`/users-profile/followers-list?user_id=${userObjectId}`);
  };

  const handleMessage = async () => {
    try {
      const payload = {
        user_1_ObjectId: user?._id,
        user_2_ObjectId: users?._id,
      };
      const result = await api.chat.createRoom(payload);
      console.log(result);
      navigate("/ChatScreen", {
        state: {
          user:
            user?._id === result?.user_1_ObjectId?._id
              ? result?.user_2_ObjectId
              : result?.user_1_ObjectId,
          roomId: result?.roomId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log("Details-->Check", followersDetails);
  return (
    <>
      <div className="flex flex-col items-center bg-black min-h-screen text-white">
        <div className="w-full">
          <OtherProfilePicture
            posts={content.length}
            followers={users?.followers?.length ?? 0}
            handleFollowersView={handleViewFOllowers}
            following={users?.following?.length ?? 0}
            setIsModalOpen={() => {}}
            otherUser={users}
          />
        </div>
        <div className="flex w-full px-3 gap-4 my-5">
          <div
            onClick={handleFollow}
            className="inline-flex items-center justify-center w-full px-5 py-4 text-sm font-semibold
        tracking-widest text-black uppercase transition-all duration-200 bg-[#d8fc5f] rounded-full 
        sm:w-auto sm:py-3 hover:opacity-90"
          >
            {isFollowing ? "Following" : "Follow"}
          </div>
          <div
            onClick={handleMessage}
            className="inline-flex items-center justify-center w-full px-5 py-4 text-sm font-semibold
        tracking-widest text-black uppercase transition-all duration-200 bg-[#d8fc5f] rounded-full 
        sm:w-auto sm:py-3 hover:opacity-90"
          >
            Chat
          </div>
        </div>

        <MediaPosts mediaPosts={content} setSelectedMedia={{}} />
      </div>
    </>
  );
};

export default FollowersProfilePage;
