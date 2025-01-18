import React, { useCallback, useContext, useEffect, useState } from "react";
import commentShare from "../../../assets/share.svg";
import "./commentstyles.css";
import AuthContext from "../../../contexts/authContext/authContext";
import { api } from "../../../utils/api";
import { demoProfileImage } from "../../../constants/dummyContent/DummyExamples";

interface Comment {
  user_id: string;
  comment_text: string;
  userName: string;
  profileImage: string | null;
  createdAt: string;
}

interface CommentSectionProps {
  onClose: () => void;
  contentId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  onClose,
  contentId,
}) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useContext(AuthContext);

  const handleAddComment = useCallback(async () => {
    if (!newComment.trim()) return;

    try {
      const payload = {
        user_id: user.id,
        content_id: contentId,
        comment_text: newComment,
      };
      const response = await api.content.commentContent(payload);
      if (response) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }, [newComment, contentId, user.id]);

  const fetchComments = async () => {
    try {
      const payload = { content_id: contentId };
      const response = await api.content.getComments(payload);
      if (response) {
        setComments(response);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [contentId]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-90 text-white p-4 z-50 rounded-t-lg animate-slideUp h-[90vh] border-t-2 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div className="mx-auto ">
          <h4 className="text-lg font-semibold">Comments</h4>
          <div className="border-t-2 mb-6"></div>
        </div>
        <button onClick={onClose} className="text-gray-400 text-xl">
          &times;
        </button>
      </div>

      {/* Comments List */}
      <div className="overflow-y-auto flex-grow mb-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-start gap-3 mb-3">
            <img
              src={comment.profileImage || demoProfileImage}
              alt={`${comment.userName}'s profile`}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">{comment.userName}</p>
              <p className="text-sm">{comment.comment_text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input for new comment */}
      <div className="flex items-center gap-2 mb-12">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow bg-gray-800 p-2 rounded-lg text-white outline-none"
        />
        <img
          onClick={handleAddComment}
          className="cursor-pointer h-6 w-6 mr-4"
          alt="send-comment"
          src={commentShare}
        />
      </div>
    </div>
  );
};

export default CommentSection;
