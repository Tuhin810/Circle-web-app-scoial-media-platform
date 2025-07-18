/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { api } from "../../utils/api";
import { demoProfileImage } from "../../constants/dummyContent/DummyExamples";
import likeSvg from "../.../../../assets/heart.svg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext/authContext";
import filledHeart from "../.../../../assets/filledHeart.svg";
import CommentSection from "../shared/commentSection/CommentSection";
import ImageCard from "./ImageCard";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";

const ContentLandingPage = () => {
  const postContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(AuthContext);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [openCommentSection, setOpenCommentSection] = useState<boolean>(false);
  const [selectedContentId, setSelectedContentId] = useState("");
  const [userWithLatestContent, setUserWithLatestContent] = useState<any[]>([]);
  const [contentPage, setContentPage] = useState(1);
  const navigate = useNavigate();
  let isFetching = false;
  const fetchingData = async () => {
    if (isFetching || (totalPages && contentPage > totalPages)) return;
    try {
      isFetching = true;

      const contentFilter = {
        page: contentPage,
        sortField: "updatedAt",
        limit: 2,
      };
      const contentResponse = await api.user.getUserLatestContent(
        contentFilter
      );
      console.log("Checking log--->", contentResponse);
      setUserWithLatestContent((prevContent) => [
        ...prevContent,
        ...contentResponse.result,
      ]);
      const totalResults = contentResponse.pagination.total;
      const pageSize = contentFilter.limit;
      setTotalPages(Math.ceil(totalResults / pageSize));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isFetching = false;
    }
  };

  useEffect(() => {
    fetchingData();
  }, [contentPage]);

  const handleProfileClick = (followerId: string) => {
    if (followerId === user?._id) {
      navigate(`/profile`);
    } else {
      navigate(`/users-profile?user_id=${followerId}`);
    }
  };

  const handleLikePost = useCallback(
    async (contentId: string) => {
      try {
        const payload = { user_id: user.id, content_id: contentId };
        const response = await api.content.likeContent(payload);

        setUserWithLatestContent((prevContent) =>
          prevContent.map((post) =>
            post.latestContent._id === contentId
              ? {
                  ...post,
                  latestContent: {
                    ...post.latestContent,
                    likes: response.likes,
                  },
                }
              : post
          )
        );
      } catch (error) {
        console.error("Error liking post:", error);
      }
    },
    [user.id]
  );

  const handlePostScroll = () => {
    if (postContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        postContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setContentPage((prevPage) => prevPage + 1);
      }
    }
  };

  const closeCommentSection = () => {
    setOpenCommentSection(false);
  };

  const handleComment = (postId: string) => {
    setOpenCommentSection(true);
    setSelectedContentId(postId);
  };

  const isPostLikedByUser = (likes: any) => likes?.includes(user.id);

  // console.log("UserWithContent-->", userWithLatestContent);
  return (
    <>
      <div
        ref={postContainerRef}
        className="w-full max-w-2xl p-1 overflow-y-auto mb-32 hidescroll"
        onScroll={handlePostScroll}
        style={{ maxHeight: "80vh" }}
      >
        {userWithLatestContent.length > 0 &&
          userWithLatestContent?.map((post: any) => (
            <div key={post._id} className="bg-transparent mb-4 px-1.5  ">
              <div
                className="flex flex-row items-center gap-2"
                onClick={() => handleProfileClick(post._id)}
              >
                <img
                  src={post.profile_image || demoProfileImage}
                  alt="Profile"
                  className="rounded-full w-10 h-10 object-cover "
                />
                <h4 className="font-semibold text-white">{post.user_name}</h4>
              </div>
              <ImageCard
                img={post.latestContent?.media_post}
                likes={post?.latestContent?.likes?.length}
              />
              {/* <img
                src={post.latestContent?.media_post || ""}
                alt="Post"
                className="w-full mt-2 object-cover h-auto"
              /> */}
              {/* Icons Row */}
              <div className="flex gap-5 items-center mt-4 ml-2">
                <button
                  className="flex items-center px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105"
                  onClick={() => {
                    console.log(
                      "=======>post liked id",
                      post?.latestContent._id
                    );
                    console.log("=======>post liked user", user?._id);
                    handleLikePost(post?.latestContent._id);
                  }}
                >
                  <img
                    src={
                      isPostLikedByUser(post?.latestContent?.likes)
                        ? filledHeart
                        : likeSvg
                    }
                    alt="Like"
                    className="w-6 h-6 mr-1"
                  />
                  <span className="text-white text-sm font-medium">
                    {isPostLikedByUser(post?.latestContent?.likes)
                      ? "Liked"
                      : "Like"}
                  </span>
                </button>

                <button
                  className="flex items-center -ml-2 px-3 py-2 rounded-full backdrop-blur bg-white/10 border border-white/10
                   shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform hover:scale-105"
                  onClick={() => handleComment(post?.latestContent._id)}
                >
                  <HiMiniChatBubbleOvalLeft className="text-white w-6 h-6" />
                  <span className="text-white text-sm font-medium ml-1">
                    Comment
                  </span>
                </button>
              </div>
              <div className="mt-1 ml-2">
                <p className="text-white ">
                  {post?.latestContent?.description}
                </p>
                <p className="text-gray-500 text-[13px]">3 days ago</p>
              </div>
            </div>
          ))}
      </div>

      {openCommentSection && (
        <CommentSection
          onClose={closeCommentSection}
          contentId={selectedContentId}
        />
      )}
    </>
  );
};

export default ContentLandingPage;
