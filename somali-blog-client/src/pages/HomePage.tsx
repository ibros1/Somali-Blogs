import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import DOMPurify from "dompurify";
import type { RootState, AppDispatch } from "../redux/store";
import { getAllPostsFn } from "@/redux/slices/auth/articles/getArticle";
import { createArticleFn } from "@/redux/slices/auth/articles/articles";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
    if (logInState.data.user) dispatch(getAllPostsFn());
  }, [dispatch, logInState.data.user]);

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

  if (!logInState.data.user) {
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
          {/* Cover Image */}
          <div className=" w-full h-28 rounded-xl overflow-hidden bg-gray-200">
            {user.coverPhoto ? (
              <img
                src={user.coverPhoto}
                alt="cover"
                className="w-full h-full object-cover "
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600" />
            )}

            {/* Profile photo overlaps the bottom of the cover */}
            <div className="z-10">
              <img
                src={user.profilePhoto}
                alt="avatar"
                className="absolute -mt-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* Spacing to offset avatar overlap */}
          <div className="mt-16 text-center px-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {user.fullname}
            </h2>
            <p className="text-sm text-blue-600 mt-1">
              @{user.fullname.split(" ")[0]}
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

        {/* Main Feed */}
        <main className="flex flex-col gap-6">
          {/* Create Post */}
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 flex items-start gap-4">
            <img
              src={logInState.data.user.profilePhoto}
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
              const maxLength = 80;
              const isLong = article.title.length > maxLength;
              const shortTitle = isLong
                ? article.title.slice(0, maxLength) + "..."
                : article.title;

              return (
                <div
                  key={article.id}
                  className="relative bg-white rounded-xl shadow-md border border-gray-100 p-5 transition hover:shadow-lg before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(circle,_rgba(0,0,0,0.03)_1px,_transparent_1px)] before:bg-[length:20px_20px] before:opacity-40 before:pointer-events-none overflow-hidden"
                >
                  {/* User Info */}
                  <div className="flex items-start gap-3 mb-4 relative z-10">
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
                        className="text-gray-400 hover:text-gray-600 transition text-lg font-bold"
                      >
                        &#8942;
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h1
                    className="font-bold text-base cursor-pointer text-blue-800 mb-2 break-words z-10 relative"
                    onClick={() => navigate(`/articles/${article.id}`)}
                  >
                    {isExpanded || !isLong ? article.title : shortTitle}
                  </h1>
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => toggleTitle(idStr)}
                      className="text-blue-600 text-sm underline w-fit mt-1 z-10 relative"
                    >
                      {isExpanded ? "See less" : "See more"}
                    </button>
                  )}

                  {/* Content */}
                  <div
                    className="bg-[#f9f9f9] rounded-xl p-4 mt-3 text-gray-800 text-sm leading-relaxed cursor-pointer z-10 relative"
                    onClick={() => navigate(`/articles/${article.id}`)}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(article.content)
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
                        ),
                    }}
                  ></div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-4 text-gray-500 text-sm border-t pt-2 z-10 relative">
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
    </div>
  );
};

export default HomePage;
