import type { RootState } from "@/redux/store";
import coverPhoto from "../assets/coverPhoto.png";

import { useSelector } from "react-redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";

const MyProfileContainer = () => {
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const myArticlesState = useSelector(
    (state: RootState) => state.myArticlesSlice
  );

  if (myArticlesState.loading) return <p>Loading...</p>;
  if (myArticlesState.error) return <p> {myArticlesState.error} </p>;
  const user = loginState.data.user;

  return !loginState.data.isSuccess ? (
    <p className="text-red-600 text-center font-bold text-2xl">
      Please login First.....
    </p>
  ) : (
    <div>
      <div className="relative w-full h-64 ">
        {/* Cover photo with overlay */}
        <div className="absolute inset-0 rounded-lg bg-black/20 w-[90%] flex flex-col justify-center mx-auto">
          {user.coverPhoto && (
            <img
              src={
                !user.coverPhoto || user.coverPhoto.trim() === " "
                  ? coverPhoto
                  : user.coverPhoto
              }
              alt="cover"
              className="w-full h-full object-cover rounded-lg  border-2"
            />
          )}
        </div>

        {/* Profile Image with Role Badge */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
              <img
                src={user.profilePhoto}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-5 left-25 top-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          {/* Role Badge */}
          <div className="-mt-4 ml-1.5 z-50 bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            {"Member"}
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-24 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{user.fullname}</h1>
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

        <div className="mt-4">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button>Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>Name</Label>
                    <Input
                      id="name-1"
                      name="name"
                      defaultValue={user.fullname}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Email</Label>
                    <Input
                      id="email-1"
                      name="email"
                      defaultValue={user.email}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Username</Label>
                    <Input
                      id="username-1"
                      name="username"
                      defaultValue={user.fullname.split(" ")[0]}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Change your profile Photo</Label>
                    <input
                      type="file"
                      name="profile"
                      accept="image/*"
                      className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                      onChange={async (e) => {
                        const file = e.currentTarget.files?.[0];

                        if (file) {
                          // Convert file to base64 string
                          const reader = new FileReader();
                          reader.onloadend = () => {};
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Change your Cover Photo</Label>
                    <input
                      type="file"
                      name="coverPhoto"
                      accept="image/*"
                      className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                      onChange={async (e) => {
                        const file = e.currentTarget.files?.[0];

                        if (file) {
                          // Convert file to base64 string
                          const reader = new FileReader();
                          reader.onloadend = () => {};
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MyProfileContainer;
