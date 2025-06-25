import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import MyArticles from "./myArticles";
import { useEffect } from "react";
import { getMyArticlesFn } from "@/redux/slices/auth/articles/myArticles";
import MyProfileContainer from "./myprofileContainer";

const MyProfile = () => {
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const myArticlesState = useSelector(
    (state: RootState) => state.myArticlesSlice
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getMyArticlesFn());
  }, [dispatch]);

  if (myArticlesState.loading) return <p>Loading...</p>;
  if (myArticlesState.error) return <p> {myArticlesState.error} </p>;

  return !loginState.data.isSuccess ? (
    <p className="text-red-600 text-center font-bold text-2xl">
      Please login First.....
    </p>
  ) : (
    <div className="w-full min-h-screen bg-gray-50 pb-12">
      {/* Cover Section */}
      <MyProfileContainer />

      {/* Tabs */}
      <div className="flex justify-center border-b mt-8 mx-4">
        <div className="flex space-x-8 max-w-2xl w-full">
          <button className="font-medium text-indigo-600 border-b-2 border-indigo-600 pb-3 px-1">
            Posts
          </button>
          <button className="font-medium text-gray-500 hover:text-indigo-600 pb-3 px-1 transition-colors">
            Photos
          </button>
          <button className="font-medium text-gray-500 hover:text-indigo-600 pb-3 px-1 transition-colors">
            Videos
          </button>
          <button className="font-medium text-gray-500 hover:text-indigo-600 pb-3 px-1 transition-colors">
            Saved
          </button>
        </div>
      </div>

      {/* Posts area */}
      {myArticlesState.data?.articles?.length > 0 ? (
        <MyArticles />
      ) : (
        <div className="max-w-2xl mx-auto mt-8 px-4">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border">
            <div className="text-gray-300 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              No posts yet
            </h3>
            <p className="text-gray-500 mt-1 max-w-md mx-auto">
              When you share photos, videos or thoughts, they'll appear here.
            </p>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create your first post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
