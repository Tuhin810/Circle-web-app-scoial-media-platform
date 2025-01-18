/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { IContent } from "../../@types/interface/content.interface";
import { api } from "../../utils/api";
import { demoProfileImage } from "../../constants/dummyContent/DummyExamples";
import likeSvg from "../.../../../assets/heart.svg";
import commentSvg from "../.../../../assets/comment.svg";
import shareSvg from "../.../../../assets/share.svg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext/authContext";
import filledHeart from "../.../../../assets/filledHeart.svg";
import CommentSection from "../shared/commentSection/CommentSection";

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
        className="w-full max-w-2xl p-1 overflow-y-auto"
        onScroll={handlePostScroll}
        style={{ maxHeight: "80vh" }}
      >
        {userWithLatestContent.length > 0 &&
          userWithLatestContent?.map((post: any) => (
            <div key={post._id} className="bg-transparent mb-4  ">
              <div
                className="flex flex-row items-center gap-2"
                onClick={() => handleProfileClick(post._id)}
              >
                <img
                  src={post.profile_image || demoProfileImage}
                  alt="Profile"
                  className="rounded-full w-10 h-10 object-cover border border-white"
                />
                <h4 className="font-semibold text-white">{post.user_name}</h4>
              </div>
              <img
                src={post.latestContent?.media_post || ""}
                alt="Post"
                className="w-full mt-2 object-cover h-auto"
              />
              {/* Icons Row */}
              <div className="flex gap-5 items-center mt-2 ml-2">
                <button
                  className="flex items-center"
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
                </button>
                <button
                  className="flex items-center"
                  onClick={() => handleComment(post?.latestContent._id)}
                >
                  <img
                    src={commentSvg}
                    alt="Comment"
                    className="w-6 h-6 mr-1"
                  />
                </button>
                <button className="flex items-center">
                  <img src={shareSvg} alt="Share" className="w-6 h-6 mr-1" />
                </button>
              </div>
              <div className="mt-1 ml-2">
                <p className="text-white text-sm font-semibold">{`${post?.latestContent?.likes?.length} likes`}</p>
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
