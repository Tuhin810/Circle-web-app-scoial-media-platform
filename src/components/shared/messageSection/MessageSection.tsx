import React, { useContext, useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/authContext/authContext";
import { api } from "../../../utils/api";
import { IUser } from "../../../@types/interface/user.interface";
import { demoProfileImage } from "../../../constants/dummyContent/DummyExamples";
import FloatingNavbar from "../floatingNavbar/FloatingNavbar";

const MessageSection = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [userList, setUserList] = useState<IUser[]>([]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNavigateToChat = (item: any) => {
    navigate("/ChatScreen", {
      state: { user: item?.otherUser, roomId: item?.roomId },
    });
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

  return (
    <div className="h-screen bg-gray-900">
      <div className="flex pt-5 bg-gray-800 pb-4">
        <button
          className="text-gray-500 hover:text-gray-800 pl-5 items-center"
          onClick={handleBackClick}
        >
          <img
            className="h-8 w-8"
            src="https://cdn-icons-png.freepik.com/512/14997/14997052.png"
            alt=""
          />
        </button>
        <h2 className="text-xl font-semibold text-white ml-3">Messages</h2>
      </div>

      <div className="p-4 mx-1">
        {userList.length > 0 && (
          <>
            {userList.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-gray-800 rounded-xl px-5 py-3
             mb-4  cursor-pointer"
                onClick={() => handleNavigateToChat(item)}
              >
                <div className="flex items-center">
                  <img
                    src={item?.otherUser?.profile_image || demoProfileImage}
                    alt={item.user_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="ml-3 text-white">
                    {item?.otherUser?.user_name}
                  </span>
                </div>
                <button className="text-gray-500 hover:text-white">
                  {/* <BsChatDots size={20} /> */}
                  <img
                    className="h-8 w-8"
                    src="https://cdn-icons-png.freepik.com/512/14996/14996870.png"
                    alt=""
                  />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <FloatingNavbar />
    </div>
  );
};

export default MessageSection;
