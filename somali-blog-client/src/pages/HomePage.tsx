import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import DOMPurify from "dompurify";
import type { RootState, AppDispatch } from "../redux/store";
import { getAllPostsFn } from "@/redux/slices/auth/articles/getArticle";
import { createArticleFn } from "@/redux/slices/auth/articles/articles";
import PostModal from "@/components/postModal";

interface Article {
  title: string;
  content: string;
  user?: {
    fullname?: string;
    profilePhoto?: string;
  };
}

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [selectedPost, setSelectedPost] = useState<Article | null>(null);
  const [yourMind, setYourMind] = useState("");
  const [expandedTitles, setExpandedTitles] = useState<Record<string, boolean>>(
    {}
  );

  const articleState = useSelector((state: RootState) => state.getArticleSlice);
  const postArticleState = useSelector(
    (state: RootState) => state.articleSlice
  );
  const sortedArticleState = (articleState?.data?.articles ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  const logInState = useSelector((state: RootState) => state.loginSlice);
  const user = logInState.data.user;

  useEffect(() => {
    if (user) dispatch(getAllPostsFn());
  }, [dispatch, user]);

  useEffect(() => {
    if (postArticleState.posts.isSuccess) {
      toast.success("Successfully created post");
      setYourMind("");
    }
  }, [postArticleState.posts.isSuccess]);

  const postHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!yourMind.trim()) return;
    dispatch(
      createArticleFn({
        title: yourMind.trim(),
        content: yourMind.trim(),
        isPublished: true,
      })
    );
  };

  const toggleTitle = (id: string) => {
    setExpandedTitles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-3xl font-bold text-red-500">
        Please Login First!
      </div>
    );
  }

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-32">
        {/* Sidebar */}
        <aside
          className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col items-center md:sticky md:top-20 md:h-fit cursor-pointer md:w-80 hover:shadow-lg transition-shadow"
          onClick={() => navigate("/my-account")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate("/my-account");
          }}
        >
          <div className="w-full h-28 rounded-xl overflow-hidden bg-gray-200">
            {user.coverPhoto ? (
              <img
                src={user.coverPhoto}
                alt="cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600" />
            )}
            <div>
              <img
                src={user.profilePhoto}
                alt="avatar"
                className="absolute -mt-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-[2.1rem] z-10">
              <span
                className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold shadow-sm transition-all ${
                  user.role === "admin"
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                    : "bg-gradient-to-r from-pink-500 to-red-400 text-white"
                }`}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>

          <div className="mt-16 text-center px-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {user.fullname}
            </h2>
            <p className="text-sm text-blue-600 mt-1">
              @{user.fullname.split(" ")[1]}
            </p>
          </div>

          <div className="flex gap-8 mt-6 text-center text-sm text-gray-700 font-medium">
            <div>
              <p>20</p>
              <p className="text-gray-400 text-xs">Posts</p>
            </div>
            <div>
              <p>18</p>
              <p className="text-gray-400 text-xs">Friends</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Member since {new Date(user.created_at).toLocaleDateString()}
          </p>

          <button
            type="button"
            className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full w-full font-semibold text-sm transition"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/my-account");
            }}
          >
            Edit Profile
          </button>
        </aside>

        {/* Feed */}
        <main className="flex flex-col gap-6">
          {/* Create Post */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 flex items-start gap-4">
            <img
              src={user.profilePhoto}
              className="w-12 h-12 rounded-full object-cover"
              alt="User"
            />
            <form onSubmit={postHandler} className="flex-1 flex gap-3">
              <input
                type="text"
                placeholder="What's on your mind?"
                className="bg-gray-100 px-4 py-2 rounded-full w-full text-sm outline-none"
                value={yourMind}
                onChange={(e) => setYourMind(e.target.value)}
              />
              <button
                type="submit"
                className={`self-end px-4 py-2 rounded-full font-semibold text-white text-sm ${
                  yourMind.trim()
                    ? "bg-blue-600 hover:bg-blue-500 transition"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
                disabled={!yourMind.trim()}
              >
                Post
              </button>
            </form>
          </div>

          {/* Posts List */}
          {Array.isArray(sortedArticleState) &&
            sortedArticleState.map((article) => {
              const idStr = article.id.toString();
              const isExpanded = expandedTitles[idStr];
              const isLong = article.title.length > 80;
              const shortTitle = isLong
                ? article.title.slice(0, 80) + "..."
                : article.title;

              const sanitizedHTML = DOMPurify.sanitize(article.content)
                .replace(
                  /<img /g,
                  `<img style="max-width:100%;width:100%;max-height:450px;height:auto;object-fit:cover;display:block;margin:1rem auto;border-radius:12px;" `
                )
                .replace(
                  /<iframe /g,
                  `<iframe style="max-width:100%;width:100%;height:450px;min-height:300px;display:block;margin:1rem auto;border-radius:12px;" `
                )
                .replace(
                  /<h1>/g,
                  `<h1 style="font-size:1.25rem;font-weight:bold;color:#111;margin-bottom:0.5rem;">`
                )
                .replace(
                  /<h2>/g,
                  `<h2 style="font-size:1.15rem;font-weight:600;color:#222;margin-bottom:0.5rem;">`
                );

              return (
                <div
                  key={article.id}
                  className="relative bg-white rounded-xl shadow-md border border-gray-100 p-5 transition hover:shadow-lg overflow-hidden"
                >
                  {/* User Info */}
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={article.user.profilePhoto}
                      alt="User"
                      className="w-11 h-11 cursor-pointer rounded-full object-cover border"
                      onClick={() => navigate(`/members/${article.user.id}`)}
                    />
                    <div>
                      <h4
                        className="text-sm font-semibold cursor-pointer text-gray-800"
                        onClick={() => navigate(`/members/${article.user.id}`)}
                      >
                        {article.user.fullname}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(article.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <button
                        title="More options"
                        className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                      >
                        &#8942;
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h1
                    className="font-bold text-base cursor-pointer text-blue-800 mb-2"
                    onClick={() => navigate(`/articles/${article.id}`)}
                  >
                    {isExpanded || !isLong ? article.title : shortTitle}
                  </h1>
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => toggleTitle(idStr)}
                      className="text-blue-600 text-sm underline w-fit mt-1"
                    >
                      {isExpanded ? "See less" : "See more"}
                    </button>
                  )}

                  {/* Content with image click support */}
                  <div
                    className="bg-[#f9f9f9] rounded-xl p-4 mt-3 text-gray-800 text-sm leading-relaxed cursor-pointer"
                    dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.tagName === "IMG") {
                        const imageSrc = (target as HTMLImageElement).src;
                        setSelectedPost({
                          title: article.title,
                          content: `<img src="${imageSrc}" style="max-width:100%" />`,
                          user: article.user,
                        });
                      }
                    }}
                  ></div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-4 text-gray-500 text-sm border-t pt-2">
                    <div className="flex gap-5">
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <FaRegThumbsUp /> Like
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <FaRegCommentDots /> Comment
                      </button>
                    </div>
                    <span className="text-xs">ID: {article.id}</span>
                  </div>
                </div>
              );
            })}
        </main>
      </div>

      {/* Post Popup */}
      <PostModal
        isOpen={!!selectedPost}
        article={selectedPost}
        onClose={() => setSelectedPost(null)}
        onImageClick={(imageSrc, title, user) => {
          setSelectedPost({
            title,
            content: `<img src="${imageSrc}" style="max-width:100%" />`,
            user,
          });
        }}
      />
    </div>
  );
};

export default HomePage;
