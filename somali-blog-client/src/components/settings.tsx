// components/SettingsPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import type { RootState } from "../redux/store";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const logInState = useSelector((state: RootState) => state.loginSlice);
  const user = logInState?.data?.user;

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  if (!user) return null; // or loading spinner

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
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
              navigate("/my-account/edit");
            }}
          >
            Edit Profile
          </button>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 max-w-4xl bg-white shadow-xl rounded-2xl p-8 space-y-10">
          <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>

          {/* Profile Settings */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Profile
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={user.fullname}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={user.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+252 61 1234567"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Hargeisa, Somaliland"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue=""
                />
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Get emails for activity like comments and follows.
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                  className={`${
                    emailNotifications ? "bg-blue-600" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                >
                  <span
                    className={`${
                      emailNotifications ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enable dark appearance across the app.
                  </p>
                </div>
                <Switch
                  checked={darkMode}
                  onChange={setDarkMode}
                  className={`${
                    darkMode ? "bg-blue-600" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                >
                  <span
                    className={`${
                      darkMode ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
            </div>
          </section>

          {/* Password */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Security
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-500 transition">
              Save Changes
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
