import React, { useContext, useEffect, useState } from "react";
import { IoChatbubbleOutline, IoChevronBackSharp } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/authContext/authContext";
import { api } from "../../../utils/api";
import { IUser } from "../../../@types/interface/user.interface";
import { demoProfileImage } from "../../../constants/dummyContent/DummyExamples";
import FloatingNavbar from "../floatingNavbar/FloatingNavbar";
import { GrAd } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { formatDate } from "../../../utils/commonFunction/dateFormater";

const MessageSection = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNavigateToChat = (item: any) => {
    navigate("/ChatScreen", {
      state: { user: item?.otherUser, roomId: item?.roomId },
    });
  };

  const fetchingData = async () => {
    try {
      const filter = {
        page: 1,
        sortField: "updatedAt",
        limit: 5,
      };
      const userResponse = await api.user.getUser(filter);
      console.log("User Response--->", userResponse);

      const filteredFollowers = userResponse.result.filter(
        (follower: IUser) => follower._id !== user._id
      );
      setFollowers((prevFollowers) => [...prevFollowers, ...filteredFollowers]);
      const totalResults = userResponse.pagination.total;
      const pageSize = filter.limit;
      // setTotalPages(Math.ceil(totalResults / pageSize));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const filter = {
          page: 1,
          sortField: "updatedAt",
          limit: 5,
        };
        const userResponse = await api.chat.getChatList(user?._id);
        console.log("Response--Message--->", userResponse);
        setUserList(userResponse);
      } catch (error) {
        console.log("Error while fetching", error);
      }
    };
    fetchFollowers();
  }, []);

  useEffect(() => {
    fetchingData();
  }, [user]);

  return (
    <div className="h-screen bg-black pt-5">
      <div className="flex justify-between  items-center px-4 pb-5">
        <h2
          className="text-white text-2xl font-bold ml-2 t font-bold text-2xl leading-tight flex gap-2"
          // style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {/* <GrAd className="text-[#d8fc5f]" /> */}
          Messages
        </h2>
        {/* <Link to={"/profile"}>
          <img
            src={
              user?.profile_image ||
              "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full  object-cover"
          />
        </Link> */}
      </div>
      <Link
        to="/search"
        className="flex mx-3 mb-5 items-center px-5 h-12 rounded-full backdrop-blur bg-[#181818] border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform text-gray-200"
      >
        <input
          type="text"
          placeholder="Type something..."
          className="bg-transparent text-white flex-1 pl-2 focus:outline-none focus:ring-0 border-none"
          readOnly
        />
        <FiSearch size={22} className="text-[#d8fc5f]" />
      </Link>
      <div
        className="flex space-x-4 ml-3 mb-5 hidescroll overflow-x-auto scrollbar-hide"
        // onScroll={handleScroll}
      >
        {followers.map((follower) => (
          <div
            key={follower._id}
            className="flex gap-2 flex-col items-center min-w-max"
            // onClick={() => handleFollowersProfileClick(follower._id)}
          >
            <div className="">
              <img
                src={follower.profile_image || demoProfileImage}
                alt="Profile"
                className="rounded-[1.7rem]  w-16 h-16 border border-gray-900 object-cover"
              />
            </div>

            <span className="text-xs mt-1 text-gray-200">
              {follower.user_name.length > 7
                ? `${follower.user_name.slice(0, 7)}...`
                : follower.user_name}
            </span>
          </div>
        ))}
      </div>

      <div className=" bg-[#181818] mx-1 mx-3 rounded-[1.4rem]  py-5">
        {userList.length > 0 && (
          <>
            {userList.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center justify-between  px-5 
             mb-4  cursor-pointer"
                onClick={() => handleNavigateToChat(item)}
              >
                <div className="flex items-center">
                  <div className="">
                    <img
                      src={item?.otherUser?.profile_image || demoProfileImage}
                      alt="Profile"
                      className="rounded-[1.7rem]  w-16 h-16 border border-gray-900 object-cover"
                    />
                  </div>
                  <div className="">
                    <span className="ml-3 text-gray-200">
                      {item?.otherUser?.user_name}
                    </span>
                    <div className="text-xs text-gray-500 pl-3">
                      {formatDate(item?.updatedAt)}
                    </div>
                  </div>
                </div>
                <button
                  className="flex items-center -ml-2 px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                             shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-sm font-medium"
                >
                  <IoChatbubbleOutline
                    size={22}
                    className="text-[#d8fc5f] font-extrabold"
                  />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageSection;
