import type { RootState } from "@/redux/store";
import { Reply, ThumbsUp } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as dayjs from "dayjs";
const ListComments = () => {
  const navigate = useNavigate();
  const listArticleCommentsState = useSelector(
    (state: RootState) => state.listArticleComments
  );

  if (listArticleCommentsState.loading)
    return <h1 className="font-bold">Loading...</h1>;
  if (listArticleCommentsState.error)
    return <h1 className="font-bold">{listArticleCommentsState.error}</h1>;

  const comments = listArticleCommentsState.data?.comments ?? [];
  const sortedComments = comments
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return comments.length === 0 ? (
    <div className="text-gray-500 text-sm italic px-4">No comments yet.</div>
  ) : (
    <div className="space-y-4 p-4">
      {sortedComments.map((comment) => (
        <div
          key={comment.id}
          className="border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300 bg-white"
        >
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 shrink-0 ">
              <img
                src={comment.user.profilePhoto}
                alt={comment.user.fullname}
                className="w-full h-full rounded-full object-cover cursor-pointer"
                onClick={() => navigate(`/members/${comment.user_id}`)}
              />
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <h2
                  className="font-semibold text-gray-800 cursor-pointer"
                  onClick={() => navigate(`/members/${comment.user_id}`)}
                >
                  {comment.user.fullname}
                </h2>
                <p className="text-sm text-gray-500">{comment.user.email}</p>
              </div>
              <p className="text-gray-700 mb-3">{comment.comment}</p>

              <div className="flex gap-4 text-sm text-blue-600 font-medium">
                <button className="flex items-center gap-1 hover:underline">
                  <ThumbsUp className="w-4 h-4" />
                  Like
                </button>
                <button className="flex items-center gap-1 hover:underline">
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListComments;
