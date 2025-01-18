import { useContext, useEffect, useState } from "react";

import { IoChevronBackSharp } from "react-icons/io5";
import { api } from "../../../utils/api";
import { demoProfileImage } from "../../../constants/dummyContent/DummyExamples";
import { IUser } from "../../../@types/interface/user.interface";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/authContext/authContext";

const FollowersFollowingModels = () => {
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers"
  );
  const query = new URLSearchParams(window.location.search);
  const { user } = useContext(AuthContext);
  const userObjectId = query.get("user_id");
  const [followerDetails, setFollowersDetails] = useState<IUser[]>([]);
  const [followingDetails, setFollowingDetails] = useState<IUser[]>([]);
  const [actualUser, setActualUser] = useState<IUser>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const payload = { userObjectId };
        const response = await api.user.getFollowers(payload);
        console.log("FollowerFollowingList-->", response);
        setFollowersDetails(response.followerList);
        setFollowingDetails(response.followingList);
        setActualUser(response.user);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchFollowers();
  }, [userObjectId]);

  const handleUserClick = (followerId: string) => {
    // onClose();
    if (followerId === user?._id) {
      navigate(`/profile`);
    } else {
      navigate(`/users-profile?user_id=${followerId}`);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // This will take the user to the previous page
  };
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full sm:w-1/3 bg-black shadow-lg`}
    >
      {/* Header with back button and username */}
      <div className="flex items-center justify-between p-4">
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={handleBackClick}
        >
          <IoChevronBackSharp color="white" size={20} />
        </button>
        <h2 className="text-xl font-semibold text-white mx-auto">
          {actualUser?.user_name}
        </h2>
      </div>

      {/* Toggle between Followers and Following */}
      <div className="flex justify-evenly items-center border-b border-gray-600">
        <button
          className={`text-white pb-2 ${
            activeTab === "followers"
              ? "border-b-2 border-blue-500"
              : "border-b-2 border-transparent"
          }`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
        <button
          className={`text-white pb-2 ${
            activeTab === "following"
              ? "border-b-2 border-blue-500"
              : "border-b-2 border-transparent"
          }`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
      </div>

      {/* Content for Followers or Following */}
      <div className="p-4">
        {activeTab === "followers" ? (
          <p className="text-white">
            {followerDetails.length > 0 ? (
              <>
                {followerDetails.map((followers, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-gray-200"
                    >
                      <div
                        className="flex items-center"
                        onClick={() => handleUserClick(followers._id)}
                      >
                        <img
                          src={followers.profile_image || demoProfileImage}
                          alt=""
                          className="object-cover h-12 w-12 rounded-full mr-4"
                        />
                        <div className="flex flex-col">
                          <p className="text-white font-semibold">
                            {followers.user_name}
                          </p>
                          <p className="text-white text-[12px]">
                            {followers.full_name}
                          </p>
                        </div>
                      </div>
                      <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded-md hover:bg-blue-500 hover:text-white transition">
                        Message
                      </button>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center space-y-4">
                  <p className="text-3xl font-semibold animate-pulse">
                    No followers yet
                  </p>
                  <p className="text-lg text-gray-400">
                    But don't worry, you're just getting started!
                  </p>
                </div>
                <div className="mt-6">
                  <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition duration-300 ease-in-out">
                    Invite Friends
                  </button>
                </div>
              </div>
            )}
          </p>
        ) : (
          <>
            {followingDetails.length > 0 ? (
              followingDetails.map((following, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-gray-200"
                >
                  <div
                    className="flex items-center"
                    onClick={() => handleUserClick(following._id)}
                  >
                    <img
                      src={following.profile_image || demoProfileImage}
                      alt={following.user_name}
                      className="object-cover h-12 w-12 rounded-full mr-4"
                    />
                    <div className="flex flex-col">
                      <p className="text-white font-semibold">
                        {following.user_name}
                      </p>
                      <p className="text-white text-[12px]">
                        {following.full_name}
                      </p>
                    </div>
                  </div>
                  <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded-md hover:bg-blue-500 hover:text-white transition">
                    Message
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center space-y-4">
                  <p className="text-3xl font-semibold animate-pulse">
                    Not following anyone yet
                  </p>
                  <p className="text-lg text-gray-400">
                    Start exploring and follow some users!
                  </p>
                </div>
                <div className="mt-6">
                  <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition duration-300 ease-in-out">
                    Explore Users
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowersFollowingModels;
