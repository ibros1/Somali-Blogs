import Spinner from "@/components/spinner";
import { getOneArticleFn } from "@/redux/slices/auth/articles/getOneArticle";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import Comments from "@/components/comments";
import ListComments from "@/components/listArticleComments";
import { listArticleCommentFn } from "@/redux/slices/auth/comments/listComments";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const dipatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dipatch(getOneArticleFn(+articleId!));
    dipatch(
      listArticleCommentFn({
        articleId: +articleId!,
        page: 1,
        size: 10,
      })
    );
  }, []);

  // console.log(articleId);
  const getArticleDetailState = useSelector(
    (state: RootState) => state.getArticleDetailSlice
  );

  if (getArticleDetailState.loading) return <Spinner />;
  if (getArticleDetailState.error)
    return (
      <div>
        <h1 className="text-red-600 "> {getArticleDetailState.error} </h1>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4 mt-6 bg-white rounded-lg shadow-md my-8">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img
          src={
            getArticleDetailState?.posts?.article?.user?.profilePhoto ||
            "/default-avatar.png"
          }
          alt="Author Avatar"
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {getArticleDetailState.posts?.article?.user?.fullname ||
              "Anonymous"}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date(
              getArticleDetailState.posts?.article?.created_at
            ).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Title and Content */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">
          {getArticleDetailState.posts?.article?.title}
        </h1>
        <div
          className="text-gray-700 leading-normal"
          dangerouslySetInnerHTML={{
            __html: getArticleDetailState.posts?.article?.content
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
      </div>

      {/* Like & Comment Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-100 rounded-md">
          <FaThumbsUp />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          <FaCommentDots />
          <span>Comment</span>
        </button>
      </div>

      {/* Comments Section Placeholder */}
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Create comment this post</h3>
        <Comments articleId={+articleId!} />
      </div>
      <div className="comments">
        <ListComments />
      </div>
    </div>
  );
};

export default ArticleDetail;
