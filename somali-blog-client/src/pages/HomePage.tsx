import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";

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
  const logInState = useSelector((state: RootState) => state.loginSlice);

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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside
          className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col gap-4 items-center md:sticky top-20 h-fit"
          onClick={() => navigate("/my-account")}
        >
          <img
            src={logInState.data.user.profilePhoto}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
            alt="avatar"
          />
          <h2 className="text-lg font-bold text-gray-800 text-center">
            {logInState.data.user.fullname}
          </h2>
          <p className="text-xs text-gray-500 -mt-2 mb-2 text-center">
            Member since{" "}
            {new Date(
              logInState.data.user.created_at || Date.now()
            ).toLocaleDateString()}
          </p>

          {/* Stats */}

          {/* Shortcuts */}

          <button className=" bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full w-full font-semibold text-sm">
            Edit Profile
          </button>
          <div className="flex justify-between w-full text-center text-sm text-gray-700">
            <div>
              <p className="font-semibold">42</p>
              <p className="text-gray-500">Posts</p>
            </div>
            <div>
              <p className="font-semibold">89</p>
              <p className="text-gray-500">Friends</p>
            </div>
          </div>
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
            <form onSubmit={postHandler} className="flex-1 flex  gap-3">
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
          {Array.isArray(articleState.data.articles) &&
            articleState.data.articles.map((article) => {
              const idStr = article.id.toString();
              const isExpanded = expandedTitles[idStr];
              const maxLength = 100;
              const isLong = article.title.length > maxLength;
              const shortTitle = isLong
                ? article.title.slice(0, maxLength) + "..."
                : article.title;

              return (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 transition-all"
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
                  </div>

                  {/* Title */}
                  <h1
                    className="font-bold text-base cursor-pointer text-blue-800 mb-2 break-words"
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

                  {/* Content */}
                  <div
                    className="text-sm text-gray-700 leading-relaxed mt-3 cursor-pointer"
                    onClick={() => navigate(`/articles/${article.id}`)}
                    dangerouslySetInnerHTML={{
                      __html: article.content
                        .replace(
                          /<img /g,
                          `<img style="max-width:100%;width:100%;max-height:400px;height:auto;object-fit:cover;display:block;margin:1rem auto;border-radius:8px;" `
                        )
                        .replace(
                          /<iframe /g,
                          `<iframe style="max-width:100%;width:100%;height:450px;min-height:300px;display:block;margin:1rem auto;border-radius:8px;" `
                        ),
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
    </div>
  );
};

export default HomePage;
