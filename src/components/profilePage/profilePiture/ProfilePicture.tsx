/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
// import { IconEdit } from "@tabler/icons-react";
import AuthContext from "../../../contexts/authContext/authContext";
import { IoReturnUpBack } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { RiSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { api } from "../../../utils/api";
// import ImageUploadModal from "../editProfileModels/ImageUploadModals";

const ProfilePicture = ({
  posts,
  followers,
  following,
  setIsModalOpen,
  handleFollowersView,
}: any) => {
  const { user } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const truncateText = (text: string, limit: number) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return {
        truncated: words.slice(0, limit).join(" "),
        remaining: words.slice(limit).join(" "),
      };
    }
    return { truncated: text, remaining: "" };
  };

  const { truncated, remaining } = truncateText(user.bio, 25);
  return (
    <>
      <div
        className=" h-[82vh] bg-black text-white rounded-2xl shadow-lg overflow-hidden relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${user?.profile_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 relative z-10">
          <Link
            to={"/"}
            className="flex items-center -ml-2 px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                   shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-sm font-medium"
          >
            <IoReturnUpBack
              size={22}
              className="text-[#d8fc5f] font-extrabold mr-1"
            />{" "}
            Back
          </Link>
          <div className="flex gap-2">
            <div
              onClick={() => setIsModalOpen(true)}
              className="flex items-center -ml-2 px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                   shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-sm font-medium"
            >
              <IoMdShare size={20} className="text-[#d8fc5f] font-extrabold" />
            </div>
            <Link
              to={"/settings"}
              className="flex items-center  px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                   shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-sm font-medium"
            >
              <RiSettingsFill
                size={20}
                className="text-[#d8fc5f] font-extrabold "
              />
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 absolute bottom-0">
          <h1 className="text-4xl font-bold">{user?.user_name}</h1>
          <div className="flex space-x-2 mt-2">
            <span
              className="flex items-center -ml-2 px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                   shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-sm font-medium"
            >
              Posts {posts}
            </span>
            <span
              onClick={handleFollowersView}
              className="flex items-center -ml-2 px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                   shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-sm font-medium"
            >
              Followers {followers}
            </span>
            <span
              onClick={handleFollowersView}
              className="flex items-center -ml-2 px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                   shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105 text-white text-sm font-medium"
            >
              Following {following}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            {isExpanded ? (
              <>
                {truncated} {remaining}{" "}
                <span
                  onClick={toggleReadMore}
                  className="text-blue-400 cursor-pointer"
                >
                  Show less
                </span>
              </>
            ) : (
              <>
                {truncated}
                {remaining && (
                  <>
                    ...{" "}
                    <span
                      onClick={toggleReadMore}
                      className="text-blue-400 cursor-pointer"
                    >
                      Read more
                    </span>
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfilePicture;
