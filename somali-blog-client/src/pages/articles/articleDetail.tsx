import Spinner from "@/components/spinner";
import { getOneArticleFn } from "@/redux/slices/auth/articles/getOneArticle";
import { listArticleCommentFn } from "@/redux/slices/auth/comments/listComments";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import Comments from "@/components/comments";
import ListComments from "@/components/listArticleComments";
import type { AppDispatch, RootState } from "@/redux/store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostModal from "@/components/postModal";

dayjs.extend(relativeTime);

const ArticleDetail = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getArticleDetailState = useSelector(
    (state: RootState) => state.getArticleDetailSlice
  );
  const article = getArticleDetailState?.posts?.article;

  // Fetch article and comments
  useEffect(() => {
    if (articleId) {
      dispatch(getOneArticleFn(+articleId));
      dispatch(
        listArticleCommentFn({
          articleId: +articleId,
          page: 1,
          size: 10,
        })
      );
    }
  }, [dispatch, articleId]);

  // Handle image clicks using event delegation
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        setSelectedImage((target as HTMLImageElement).src);
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [article?.content]);

  // Loading & error states
  if (getArticleDetailState.loading) return <Spinner />;
  if (getArticleDetailState.error)
    return (
      <div>
        <h1 className="text-red-600 ">{getArticleDetailState.error}</h1>
      </div>
    );
  if (!article) return null;

  return (
    <div className="max-w-2xl mx-auto p-4 mt-6 bg-white rounded-lg shadow-md my-8">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <img
          src={article?.user?.profilePhoto || "/default-avatar.png"}
          alt="Author Avatar"
          className="w-12 h-12 rounded-full object-cover mr-3 cursor-pointer"
          onClick={() => navigate(`/members/${article.user?.id}`)}
        />
        <div>
          <h2
            className="text-md font-semibold cursor-pointer"
            onClick={() => navigate(`/members/${article.user?.id}`)}
          >
            {article.user?.fullname || "Anonymous"}
          </h2>
          <p className="text-[12px] text-[#65686C] cursor-auto">
            {`${dayjs(article.updated_at).fromNow(true)} ago.`}
          </p>
        </div>
      </div>

      {/* Title and Content */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
        <div
          ref={contentRef}
          className="text-gray-700 leading-normal"
          dangerouslySetInnerHTML={{
            __html: article.content
              .replace(
                /<img /g,
                `<img style="max-width:100%;width:100%;max-height:400px;height:auto;object-fit:cover;display:block;margin:1rem auto;border-radius:8px;cursor:pointer;" `
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

      {/* Comments */}
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Create comment this post</h3>
        <Comments articleId={+articleId!} />
      </div>
      <div className="comments">
        <ListComments />
      </div>

      {/* Image Modal */}
      <PostModal
        isOpen={!!selectedImage}
        article={{
          title: article.title,
          content: `<img src="${selectedImage}" style="max-width:100%" />`,
          user: article.user,
        }}
        onClose={() => setSelectedImage(null)}
        onImageClick={() => null}
      />
    </div>
  );
};

export default ArticleDetail;
