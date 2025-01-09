import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages.jsx";
export const ChatPage = () => {
  const { user, suggestedUser, selectedUser } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const isOnline = true;
  return (
    <div className="flex">
      <section className="left-0">
        <h2 className="font-bold mb-4 px-3 ">{user?.username}</h2>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUser.map((suggUser) => {
            return (
              <div
                onClick={() => dispatch(setSelectedUser(suggUser))}
                className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src={suggUser?.profilePicture}></AvatarImage>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggUser?.username}</span>
                  <span
                    className={`text-xs font-xs ${
                      isOnline ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full mt-5 ">
          <div className="flex gap-3 items-center border-gray-300 sticky top-0 ml-6">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <span className="ml-6">
            <Messages selectedUser={selectedUser} />
          </span>
          <div className="flex items-center p-4 border-t-gray-300">
            <input
              type="text"
              placeholder="Type here..."
              className="flex mr-2 focus-visible:ring-transparent"
            />
            <Button>Send</Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium text-xl">Send Messages</h1>
          <spn>Send a message to start a chat</spn>
        </div>
      )}
    </div>
  );
};
