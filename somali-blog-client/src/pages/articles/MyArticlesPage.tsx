import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyArticlesFn } from "@/redux/slices/auth/articles/myArticles";
import type { AppDispatch, RootState } from "@/redux/store";
import { MessageCircle, ThumbsUp, Share2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Popover } from "@radix-ui/react-popover";
import MyProfileContainer from "@/components/myprofileContainer";

const MyArticlesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.myArticlesSlice
  );
  // const userState = useSelector((state: RootState) => state.loginSlice);
  // const user = userState.data.user;

  useEffect(() => {
    dispatch(getMyArticlesFn());
  }, [dispatch]);

  const sortData = data.articles
    ? [...data.articles].sort((a, b) => b.id - a.id)
    : [];

  const articles = data.articles;

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return !articles ? (
    <h1>Please Login First </h1>
  ) : (
    <div className="w-full min-h-screen bg-gray-50 pb-12">
      {/* Profile Container */}
      <MyProfileContainer />

      {/* Articles Feed */}
      <div className=" gap-4 my-16 px-8 sm:max-w-4xl md:max-w-full mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortData.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg"
          >
            {/* Author Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={article.user?.profilePhoto || "/default-avatar.png"}
                alt="Author"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  {article.user?.fullname || "You"}
                </h2>
                <p className="text-xs text-gray-500">
                  {new Date(article.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Article Content */}
            <div className="mb-4">
              <h3
                onClick={() => navigate(`/articles/${article.id}`)}
                className="text-lg font-bold text-gray-900 cursor-pointer hover:text-indigo-600 transition"
              >
                {article.title}
              </h3>
              <p
                className="text-gray-700 text-sm mt-2 line-clamp-4"
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
              ></p>
            </div>

            {/* Post Actions */}
            <div className="flex justify-between text-sm text-gray-500 mt-6 border-t pt-4">
              <button className="flex items-center gap-1 hover:text-blue-600 transition">
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-1 hover:text-green-600 transition">
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-1 hover:text-purple-600 transition">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyArticlesPage;
