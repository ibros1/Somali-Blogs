import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import coverPhoto from "../assets/coverPhoto.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneMembersFn } from "@/redux/getOneMember";
import UserArticles from "./userArticles";

const GetOneMember = () => {
  const getOneByOneUserState = useSelector(
    (state: RootState) => state.getOneMembersSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getOneMembersFn(+userId!));
  }, [dispatch, userId]);

  const user = getOneByOneUserState.data.user;

  // ✅ Fix: Handle case where user exists but has no articles
  if (getOneByOneUserState.loading) {
    return <h2 className="text-gray-500 text-center py-10">Loading...</h2>;
  }

  if (!getOneByOneUserState.data) {
    return <h2 className="text-red-600"> This User is not valid!!!! </h2>;
  }

  const fallbackUser = user ||
    getOneByOneUserState.data.user || {
      fullname: "Unknown User",
      profilePhoto: "/default-avatar.png",
      coverPhoto: coverPhoto,
    };

  return !user ? (
    <div className="font-semibold my-auto items-center text-3xl text-center flex justify-center min-h-screen">
      {" "}
      This user is not valid!!{" "}
    </div>
  ) : (
    <div className="mx-8 my-2">
      <div className="bg-white py-4 rounded-lg shadow-sm">
        <div className="relative w-full h-64 ">
          {/* Cover Photo */}
          <div className="absolute inset-0 rounded-lg bg-black/20 w-[90%] flex flex-col justify-center mx-auto">
            <img
              src={
                !fallbackUser.coverPhoto ||
                fallbackUser.coverPhoto.trim() === ""
                  ? coverPhoto
                  : fallbackUser.coverPhoto
              }
              alt="cover"
              className="w-full h-full object-cover rounded-lg border-2"
            />
          </div>

          {/* Profile Image */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
                <img
                  src={fallbackUser.profilePhoto}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-5 left-25 top-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Role Badge */}
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-[7.1rem] z-10">
              <span
                className={`inline-flex items-center gap-2 px-6 py-1 rounded-full text-xs font-semibold shadow-sm transition-all
      ${
        user.role === "admin"
          ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white"
          : "bg-gradient-to-r from-pink-500 to-red-400 text-white"
      }
    `}
              >
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-24 px-4 text-center  ">
          <h1 className="text-2xl font-bold text-gray-900">
            {fallbackUser.fullname}
          </h1>
          <p className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Active now
          </p>

          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900">90+</p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">16</p>
              <p className="text-gray-500">Following</p>
            </div>
          </div>
        </div>
      </div>
      {/* User Articles */}
      <UserArticles />
    </div>
  );
};

export default GetOneMember;
