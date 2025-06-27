import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Profile from "./profile";
import type { RootState } from "@/redux/store";
import { Button } from "./ui/button";
import { ModeToggle } from "./darkMode";

const Header = () => {
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const navigate = useNavigate();

  return (
    <div className="flex justify-around p-3 bg-white shadow-sm border">
      <div
        className="logo cursor-pointer text-2xl font-bold"
        onClick={() => navigate("/")}
      >
        Somali Blogs
      </div>

      {loginState.data.isSuccess ? (
        <div className="menus flex gap-4 items-center">
          <Link to={"/posts/new"}>
            <Button className="cursor-pointer bg-black text-white">
              {" "}
              Create Post
            </Button>
          </Link>
          <ModeToggle />
          <Profile />
        </div>
      ) : (
        <div className="menus flex gap-4">
          <Link
            to={"/login"}
            className="bg-indigo-600 px-6 py-2 text-white rounded-md"
          >
            Login
          </Link>
          <Link
            to={"/sign-up"}
            className="bg-indigo-600 px-6 py-2 text-white rounded-md"
          >
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
