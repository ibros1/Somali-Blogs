import { type AppDispatch, type RootState } from "@/redux/store";
import coverPhoto from "../assets/coverPhoto.png";

import { useDispatch, useSelector } from "react-redux";
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
import { useEffect, useState, type FormEvent } from "react";
import {
  resetUpdateUserFn,
  updatedUserFn,
} from "@/redux/slices/auth/updateUser";
import toast from "react-hot-toast";
import Spinner from "./spinner";
import { updateLoggedInUser } from "@/redux/slices/auth/login";
const MyProfileContainer = () => {
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const myArticlesState = useSelector(
    (state: RootState) => state.myArticlesSlice
  );
  const updateUserState = useSelector(
    (state: RootState) => state.updateUserSlice
  );
  const dispatch = useDispatch<AppDispatch>();

  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedUserFullName, setUpdatedUserFullName] = useState("");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
  const [updatedProfilePhoto, setUpdatedProfilePhoto] = useState("");
  const [updatedCoverPhoto, setUpdatedCoverPhoto] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");

  useEffect(() => {
    const user = loginState.data?.user;
    if (user) {
      setUpdatedEmail(user.email || "");
      setUpdatedUserFullName(user.fullname || "");
      setUpdatedPhoneNumber(user.phone_number || "");
      setUpdatedProfilePhoto(user.profilePhoto || "");
      setUpdatedCoverPhoto(user.coverPhoto || "");
    }
  }, [loginState.data?.user]);

  const toastId = "id";
  useEffect(() => {
    if (updateUserState.data?.isSuccess) {
      dispatch(updateLoggedInUser(updateUserState.data.updatedUser));
      toast.success("Successfully Updated", { id: toastId });
      dispatch(resetUpdateUserFn());
    }
  }, [updateUserState.data, dispatch]);

  if (updateUserState.error)
    return <div className=""> {updateUserState.error} </div>;
  if (updateUserState.loading)
    return (
      <div className="">
        {" "}
        <Spinner />{" "}
      </div>
    );

  const updateUserHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      !updatedEmail.trim() ||
      !updatedPhoneNumber.trim() ||
      !updatedPassword.trim()
    ) {
      toast.error("Email, Phone number, and Password are required.");
      return;
    }

    e.preventDefault();
    dispatch(
      updatedUserFn({
        id: loginState.data.user.id,
        email: updatedEmail.trim(),
        fullname: updatedUserFullName.trim(),
        password: updatedPassword,
        phone_number: updatedPhoneNumber.trim(),
        profilePhoto: updatedProfilePhoto,
        coverPhoto: updatedCoverPhoto,
      })
    );
  };

  if (myArticlesState.loading) return <p>Loading...</p>;
  if (myArticlesState.error) return <p> {myArticlesState.error} </p>;

  const user = loginState.data.user;

  return !loginState.data.isSuccess ? (
    <p className="text-red-600 text-center font-bold text-2xl">
      Please login First.....
    </p>
  ) : (
    <div className="bg-white border shadow-sm mx-8 my-4 py-6 rounded-lg">
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
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
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
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={updateUserHandler}>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>Name</Label>
                    <Input
                      id="name-1"
                      name="name"
                      defaultValue={user.fullname}
                      onChange={(e) => setUpdatedUserFullName(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Email</Label>
                    <Input
                      id="email-1"
                      name="email"
                      defaultValue={user.email}
                      onChange={(e) => setUpdatedEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Password</Label>
                    <Input
                      id="password-1"
                      name="password"
                      placeholder="Enter your current or new password"
                      type="password"
                      onChange={(e) => setUpdatedPassword(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Phone Number</Label>
                    <Input
                      id="number-1"
                      name="phoneNumber"
                      defaultValue={user.phone_number}
                      onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Change your Profile Photo</Label>
                    <input
                      type="file"
                      accept="image/*"
                      className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (reader.result) {
                              setUpdatedProfilePhoto(reader.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Change your Cover Photo</Label>
                    <input
                      type="file"
                      accept="image/*"
                      className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (reader.result) {
                              setUpdatedCoverPhoto(reader.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    // disabled={updateUserState.loading || !updatedPhoneNumber}
                    className={`disabled:bg-blue-200 bg-blue-600`}
                    type="submit"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MyProfileContainer;
