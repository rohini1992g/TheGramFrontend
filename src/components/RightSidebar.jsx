import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { SuggestedUser } from "./SuggestedUser.jsx";
const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="ml-20 w-fit my-10">
      <div className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage
            src={user?.profilePicture || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-sm">{user?.username}</h2>
          <span className="text-gray-600 text-sm">
            {user.bio || "Bio Here....."}
          </span>
        </div>
      </div>
      <SuggestedUser />
    </div>
  );
};
export default RightSidebar;
