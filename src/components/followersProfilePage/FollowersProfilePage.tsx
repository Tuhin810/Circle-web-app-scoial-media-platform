import React, { useContext, useEffect, useState } from "react";

import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { RxVideo } from "react-icons/rx";

import { api } from "../../utils/api";

import { IUser } from "../../@types/interface/user.interface";
import FollowersMainProfileView from "./MainProfileView";
import AuthContext from "../../contexts/authContext/authContext";

import { useNavigate } from "react-router-dom";
import FloatingNavbar from "../shared/floatingNavbar/FloatingNavbar";

interface MediaPost {
  media_post: string;
}

const FollowersProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Photos");
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
    } catch (error) {}
  };
  console.log("Details-->Check", followersDetails);
  return (
    <>
      <div className="flex flex-col items-center bg-gray-900 min-h-screen text-white">
        {/* Profile Picture Section */}
        <div className="w-full">
          <FollowersMainProfileView userDetails={users} />
        </div>

        {/* User Info Section */}
        <div className="mt-8 text-center w-full px-5">
          <div className="flex justify-between items-start w-full">
            {/* Bio on the left */}
            <div className=" text-left mt-11">
              <p className="text-gray-400">@{users?.user_name}</p>
              <div className="mt-1">
                <p className="text-gray-500 text-sm font-semibold">
                  {users?.bio}
                </p>
              </div>
            </div>

            {/* Followers, Following, Posts on the right */}
            <div className="w-1/3 text-right -mt-5">
              <div className="flex justify-end gap-8">
                <div className="text-center cursor-pointer">
                  <h3 className="text-xl font-semibold">{content?.length}</h3>
                  <p className="text-gray-400">Posts</p>
                </div>
                <div className="text-center cursor-pointer">
                  <h3 className="text-xl font-semibold">
                    <button onClick={handleViewFOllowers}>
                      {followersDetails.length}
                    </button>
                  </h3>
                  <p className="text-gray-400">Followers</p>
                </div>
                <div className="text-center cursor-pointer">
                  <h3 className="text-xl font-semibold">0</h3>
                  <p className="text-gray-400">Following</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Button in the middle */}
          <div className=" flex justify-center flex-row gap-8">
            <button
              className="bg-gray-800 flex gap-2 justify-center w-[45%] mt-5 hover:bg-red-500 text-white font-medium py-3 px-6 rounded-lg"
              onClick={handleFollow}
            >
              <img
                className="h-6 w-6"
                src="https://cdn-icons-png.freepik.com/256/14996/14996907.png?ga=GA1.1.1598467923.1731688846"
                alt=""
              />
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button
              onClick={handleMessage}
              className=" flex gap-2 justify-center bg-gray-800 w-[45%] mt-5 hover:bg-red-500 text-white font-medium py-3 px-6 rounded-lg"
            >
              <img
                className="h-6 w-6"
                src="https://cdn-icons-png.freepik.com/256/14996/14996870.png?ga=GA1.1.1598467923.1731688846"
                alt=""
              />
              Message
            </button>
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
        <div className="w-full flex justify-center">
          {activeTab === "Photos" ? (
            <div className="grid grid-cols-3 gap-4 w-full p-4">
              {content.map((media) => (
                <div className="bg-gray-800 h-32">
                  <img
                    src={media?.media_post || ""}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1 w-full p-4"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default FollowersProfilePage;
