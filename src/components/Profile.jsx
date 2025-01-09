import useGetUserProfile from "@/hooks/useGetUserProfile";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Profile = () => {
  const params = useParams();
  const userId = params;
  useGetUserProfile(userId);
  console.log("haai");
  const { userProfile } = useSelector((store) => store.auth);
  console.log(userProfile + "userProfile");
  const userLoggedInProfile = true;
  const isFollowings = false;
  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-40 w-40">
              <AvatarImage
                src={
                  userProfile?.profilePicture || "https://github.com/shadcn.png"
                }
                alt="Profile_image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col ml-5">
              <div>
                <span>{userProfile?.username}</span>
              </div>
              <div>
                <span>Bio Here...</span>
              </div>
              {userLoggedInProfile ? (
                <Button variant="secondary" className="bg-gray-250 ">
                  Edit Profile
                </Button>
              ) : isFollowings ? (
                <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8 mt-10 ml-10">
                  Unfollow
                </Button>
              ) : (
                <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8 mt-10 ml-10">
                  Follow
                </Button>
              )}
            </div>
            <div className="ml-5 flex gap-7 pt-5">
              <p>posts</p>
              <p>followers</p>
              <p>followings</p>
            </div>
          </section>
        </div>
        <div>
          Posts
          <hr />
        </div>
      </div>
    </div>
  );
};
export default Profile;
