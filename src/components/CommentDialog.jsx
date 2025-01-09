import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMesssageHandler = () => {};
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="p-0 max-w-5xl flex flex-col"
      >
        <DialogTitle>
          <div className="flex flex-1">
            <div className="w-1/2">
              <img
                src="https://images.unsplash.com/photo-1731466224983-01f32f883ea7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CNss</AvatarFallback>
                  </Avatar>

                  <div>
                    <span className="font-semibold text-xs">Username</span>
                    {/* <span className="text-gray-600 text-sm">Bio Here..</span> */}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="flex flex-col items-center text-sm text-center">
                      <div className="cursor-pointer justify-center">
                        Unfollow
                      </div>
                    </DialogTitle>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex- overflow-y-auto max-h-96 p-4">
                Comment here.
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <input
                    onChange={changeEventHandler}
                    value={text}
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full outline-none border text-sm border-gray-300 p-2 rounded"
                  />
                  <Button
                    disabled={!text.trim()}
                    variant="outline"
                    onClick={sendMesssageHandler}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
export default CommentDialog;
