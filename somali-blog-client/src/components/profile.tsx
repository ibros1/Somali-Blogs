import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { logOut } from "@/redux/slices/auth/login";
import ProfileLinks from "./ProfileLinks";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Profile = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <Popover>
        <PopoverTrigger className="cursor-pointer">
          <div className="px-4 gap-2 py-1 rounded-md flex items-center justify-between bg-white  hover:shadow-sm transition-all duration-1000 cursor-pointer">
            <div>
              <span className="hidden md:flex font-semibold text-gray-900 ">
                {loginState.data.user?.fullname || "Guest"}
              </span>
              <span className="flex md:hidden font-semibold text-gray-900 ">
                {loginState.data.user?.fullname?.split(" ")?.[0] ?? "Guest"}
              </span>
            </div>
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              <Avatar>
                <AvatarImage src={loginState.data?.user.profilePhoto} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* <img
                src={
                  loginState.data.user?.profilePhoto || "/default-profile.png"
                }
                alt="Profile"
                className="w-full h-full object-cover rounded-full border border-gray-300  hover:border-2 hover:border-amber-300 transition-all duration-1000"
              /> */}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[50vw] sm:w-[60vw] md:w-[40vw] lg:w-[25vw] h-auto p-0 bg-transparent shadow-none border-none">
          <div className="bg-white  p-3 rounded-lg shadow-xl">
            <div
              className="flex w-full h-full flex-wrap shadow-sm gap-1 md:gap-4 justify-center md:justify-start items-center mx-auto md:mx-0 cursor-pointer hover:bg-gray-200  transition-all duration-700 px-2 rounded-lg"
              onClick={() => navigate("/my-account")}
            >
              <div className="flex">
                <Avatar>
                  <AvatarImage
                    src={loginState.data?.user.profilePhoto}
                    className="w-[1000px]"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div className="py-2">
                <h4 className="text-gray-800  font-semibold text-md">
                  {loginState.data.user.fullname || "Guest User"}
                </h4>
                <p className="text-gray-600 ">{loginState.data.user.email}</p>
              </div>
            </div>

            <div className="shadow-sm my-2 py-4 px-2 rounded-md bg-white ">
              {[
                {
                  icon: "bb-icon-user-check bb-icon-l",
                  linkTitle: "My-Profile",
                  to: "/my-account",
                },

                {
                  icon: "bb-icon-bell bb-icon-l",
                  linkTitle: "Notifications",
                  to: "/my-notifications",
                },
                {
                  icon: "bb-icon-users bb-icon-l",
                  linkTitle: "Members",
                  to: "/members",
                },
                {
                  icon: "bb-icon-cog bb-icon-l",
                  linkTitle: "Settings",
                  to: "/my-settings",
                },
              ].map((item, i) => (
                <ProfileLinks
                  key={i}
                  icon={item.icon}
                  linkTitle={item.linkTitle}
                  to={item.to}
                />
              ))}
            </div>
            <div className="pt-6">
              <Button
                onClick={() => {
                  dispatch(logOut());
                }}
                className="font-semibold bg-red-600 hover:bg-red-500  cursor-pointer text-white px-4 py-2 rounded-lg"
              >
                Logout
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Profile;
