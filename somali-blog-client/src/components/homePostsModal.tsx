import type { RootState } from "@/redux/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    content: string;
    user?: {
      fullname?: string;
      profilePhoto?: string;
    };
  } | null;
  onImageClick?: (
    imageSrc: string,
    title: string,
    user?: { fullname?: string; profilePhoto?: string }
  ) => void;
}
const HomePostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  article,
  onImageClick,
}) => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // modal container ref

  const getArticleDetailState = useSelector(
    (state: RootState) => state.getArticleSlice
  );
  // const user = getArticleDetailState.posts?.article?.user;
  const userId = getArticleDetailState.data?.articles?.map(
    (article) => article.user_id
  );

  useEffect(() => {
    if (!contentRef.current) return;
    if (!article) return;

    const images = contentRef.current.querySelectorAll("img");

    const handleClick = (img: HTMLImageElement) => () => {
      if (onImageClick) {
        onImageClick(img.src, article.title, article.user);
      }
    };

    images.forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", handleClick(img));
    });

    return () => {
      images.forEach((img) => {
        img.style.cursor = "";
        img.removeEventListener("click", handleClick(img));
      });
    };
  }, [article?.content, article, onImageClick]);

  if (!isOpen || !article) return null;

  // Handler for clicks on the overlay
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onOverlayClick}
    >
      <div
        ref={containerRef}
        className="bg-white w-full max-w-3xl p-6 rounded-xl relative shadow-lg overflow-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl"
        >
          ×
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={article.user?.profilePhoto || "/default-avatar.png"}
            alt="author"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => {
              if (typeof userId === "number" && !isNaN(userId)) {
                navigate(`/members/${userId}`);
              }
            }}
          />
          <div>
            <p
              className="text-sm font-semibold cursor-pointer"
              onClick={() => navigate(`/members/${Number(userId)}`)}
            >
              {article.user?.fullname || "Unknown"}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">{article.title}</h2>
        <div
          ref={contentRef}
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
      </div>
    </div>
  );
};

export default HomePostModal;
