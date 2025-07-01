import { type AppDispatch, type RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./spinner";
import { getMembersFn } from "@/redux/slices/auth/members";
import { FaUserPlus, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListMembers = () => {
  const membersState = useSelector((state: RootState) => state.getMembersSlice);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Array.isArray(membersState.data.user)) {
      dispatch(getMembersFn());
    }
  }, [dispatch, membersState.data.user]);

  if (membersState.error)
    return (
      <div className="text-center text-red-600 font-semibold">
        {membersState.error}
      </div>
    );
  if (membersState.loading) return <Spinner />;

  const users = Array.isArray(membersState.data.user)
    ? membersState.data.user
    : [];

  return !users ? (
    <h1 className="text-center text-gray-500 font-semibold mt-8">
      No users found.
    </h1>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {users.map((user, index: number) => (
        <div
          key={index}
          className="relative bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-all"
        >
          {/* Ellipsis / Menu */}
          <div
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer text-2xl bb-icon-ellipsis-h
"
          ></div>

          {/* Profile Image + Status Dot */}
          <div className="relative">
            <img
              src={user.profilePhoto || "/default-avatar.png"}
              alt="profilePhoto"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              onClick={() => navigate(`/members/${user.id}`)}
            />
            {/* Online Dot */}
            <span className="absolute bottom-20 right-4 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>

          {/* Role Badge */}
          <div className="-mt-3 z-10">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                user.role === "admin"
                  ? "bg-purple-600 text-white"
                  : user.role === "student"
                  ? "bg-green-500 text-white"
                  : user.role === "teacher"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>

          {/* Name */}
          <h3
            className="mt-3 text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
            onClick={() => navigate(`/members/${user.id}`)}
          >
            {user.fullname}
          </h3>

          {/* Joined Date */}
          <p className="text-sm text-gray-500">
            Joined{" "}
            {new Date(user.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </p>

          {/* Followers */}
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-medium text-gray-800">
              {Math.floor(Math.random() * 20 + 5)}
            </span>{" "}
            followers
          </p>

          {/* Message Button */}
          <div className="btns flex gap-2">
            <button
              className="mt-4 border border-gray-300 hover:bg-blue-400 text-gray-800 transition-all duration-900 hover:text-white text-sm px-5 py-2 rounded-full flex items-center justify-center gap-2 "
              onClick={() => alert(`Messaging ${user.fullname}`)}
            >
              <FaUserPlus size={14} /> Add Friend
            </button>
            <button
              className="mt-4 border border-gray-300 hover:bg-gray-200 duration-900 text-gray-800 hover:text-black  text-sm px-5 py-2 rounded-full flex items-center justify-center gap-2 transition-all"
              onClick={() => alert(`Messaging ${user.fullname}`)}
            >
              <FaEnvelope size={14} /> Send Message
            </button>
          </div>

          {/* Optional Footer Icons */}
          <div className="flex w-full border-t mt-5 pt-3 justify-around text-gray-500 text-xl">
            <button className="hover:text-blue-500 transition">
              <i className="fas fa-bullhorn" />
            </button>
            <button className="hover:text-blue-500 transition">
              <i className="fas fa-user-plus" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListMembers;
