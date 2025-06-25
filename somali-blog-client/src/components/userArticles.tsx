import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaRegFileAlt,
  FaRegThumbsUp,
  FaRegCommentAlt,
  FaShare,
} from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

const UserArticles = () => {
  const userArticlesState = useSelector(
    (state: RootState) => state.getOneMembersSlice
  );
  const navigate = useNavigate();
  const articles = userArticlesState.data?.articles || [];
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!articles.length) {
    return (
      <div className="text-center text-gray-500 py-20 flex flex-col items-center gap-4">
        <FaRegFileAlt size={40} className="text-blue-400" />
        <p className="text-lg">This user hasn’t posted any articles yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto space-y-6 px-4">
        {articles.map((article) => {
          const isExpanded = expanded[article.id];
          const isLong = article.content.length > 500;

          return (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 relative"
            >
              {/* Top Section - Profile */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={article.user.profilePhoto}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-base leading-tight">
                    {article.user.fullname}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(article.created_at).toLocaleString()}
                  </p>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <HiDotsHorizontal size={20} />
                </button>
              </div>

              {/* Title */}
              <h4
                onClick={() => navigate(`/articles/${article.id}`)}
                className="text-base sm:text-lg font-semibold text-gray-900 mb-2 break-words hover:underline cursor-pointer"
              >
                {article.title.length > 120
                  ? article.title.slice(0, 120) + "..."
                  : article.title}
              </h4>

              {/* Content */}
              <div
                className={`text-sm text-gray-800 leading-relaxed transition-all ${
                  !isExpanded && isLong ? "line-clamp-5" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(
                      /<img /g,
                      `<img style="max-width:100%;width:100%;max-height:400px;height:auto;object-fit:cover;display:block;margin:1rem auto;border-radius:10px;" `
                    )
                    .replace(
                      /<iframe /g,
                      `<iframe style="max-width:100%;width:100%;height:500px;min-height:300px;display:block;margin:1rem auto;border-radius:10px;" `
                    ),
                }}
              ></div>

              {/* Read More/Less */}
              {isLong && (
                <button
                  onClick={() => toggleExpand(article.id)}
                  className="text-blue-600 text-sm mt-2 hover:underline"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}

              {/* Bottom Actions */}
              <div className="mt-4 border-t pt-2 text-sm text-gray-600 flex justify-between items-center">
                <div className="flex gap-6">
                  <button className="flex items-center gap-1 hover:text-blue-600 transition">
                    <FaRegThumbsUp /> Like
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600 transition">
                    <FaRegCommentAlt /> Comment
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600 transition">
                    <FaShare /> Share
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  Article ID: {article.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserArticles;
