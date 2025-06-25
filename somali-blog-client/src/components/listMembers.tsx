import { type AppDispatch, type RootState } from "@/redux/store";
import React, { useEffect } from "react";
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
  console.log(membersState.data);
  return !users ? (
    <h1 className="text-center text-gray-500 font-semibold mt-8">
      No users found.
    </h1>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {users.map((user, index: number) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 p-5 flex flex-col items-center text-center"
        >
          <img
            src={user.profilePhoto || "/default-avatar.png"}
            alt="profilePhoto"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-sm cursor-pointer"
            onClick={() => navigate(`/members/${user.id}`)}
          />
          <h3
            className="mt-4 font-semibold text-lg text-gray-800 cursor-pointer"
            onClick={() => navigate(`/members/${user.id}`)}
          >
            {user.fullname}
          </h3>
          <p className="text-sm text-gray-500">
            @{user.fullname.split(" ")[0]}
          </p>
          <p className="text-xs mt-2 text-gray-600">
            {user.email || "user@email.com"}
          </p>

          <div className="flex gap-3 mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-full flex items-center gap-2">
              <FaUserPlus size={14} /> Connect
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-1.5 rounded-full flex items-center gap-2">
              <FaEnvelope size={14} /> Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListMembers;
