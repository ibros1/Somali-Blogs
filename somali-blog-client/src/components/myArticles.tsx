import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { FaRegThumbsUp, FaRegCommentDots, FaShare } from "react-icons/fa";

const MyArticles = () => {
  const myArticlesState = useSelector(
    (state: RootState) => state.myArticlesSlice
  );
  const articles = myArticlesState.data.articles;
  const sortedArticles = (articles ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10 space-y-6">
      {sortedArticles.map((article) => (
        <div
          key={article.id}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-4 p-4 border-b">
            <img
              src={article.user?.profilePhoto || "/default-avatar.png"}
              alt="author"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {article.user?.fullname || "You"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(article.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Body */}
          <div
            className="p-4 cursor-pointer"
            onClick={() => navigate(`/articles/${article.id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {article.title}
            </h2>

            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(
                    /<img /g,
                    `<img style="max-width:120%;width:100%;max-height:400px;height:auto;object-fit:cover;display:block;margin:1rem auto;border-radius:8px;" `
                  )
                  .replace(
                    /<iframe /g,
                    `<iframe style="max-width:100%;width:100%;height:450px;min-height:300px;display:block;margin:1rem auto;border-radius:8px;" `
                  ),
              }}
            ></div>

            <div className="mt-4">
              <span className="text-indigo-600 text-sm font-medium hover:underline">
                Read more →
              </span>
            </div>
          </div>

          {/* Footer with Actions */}
          <div className="border-t flex justify-between items-center text-gray-500 px-4 py-3 text-sm">
            <button className="flex items-center gap-1 hover:text-blue-600 transition">
              <FaRegThumbsUp className="text-lg" /> Like
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600 transition">
              <FaRegCommentDots className="text-lg" /> Comment
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600 transition">
              <FaShare className="text-lg" /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyArticles;
