import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Bookmark,
  BookMarked,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";

const Post = ({ post }) => {
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);

  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedPost = posts.filter((item) => item?._id !== post?._id);
        dispatch(setPosts(updatedPost));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // const likeUnlikeHandler = async () => {
  //   try {
  //     const action = liked ? "dislike" : "like";
  //     const res = await axios.get(
  //       `http://localhost:8000/api/v1/post/${post?._id}/${action}`,
  //       {
  //         likeUserId: user?._id,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.data.success) {
  //       const updatedLikes = liked ? postLike - 1 : postLike + 1;
  //       setPostLike(updatedLikes);
  //       setLiked(!liked);
  //       //updated post p:all post
  //       const updatedPostData = posts.map((p) =>
  //         p._id === post._id
  //           ? {
  //               ...p,
  //               likes: liked
  //                 ? p.liked.filter((id) => id !== user._id)
  //                 : [...p.likes, user._id],
  //             }
  //           : p
  //       );
  //       dispatch(setPosts(updatedPostData));
  //       toast.success(res.data.message);
  //     }
  //     console.log("like post here" + postLike);
  //   } catch (error) {}
  // };

  const likeUnlikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${action}`,
        {
          likeUserId: user?._id,
          postId: post?._id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        // Update posts data in Redux store
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error in like/unlike operation:", error);
    }
  };

  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={post.author?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <h2>{post.author?.username}</h2>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <DialogTitle>
              <Button variant="ghost" className="cursor-pointer w-fit">
                unfollow
              </Button>
              {user && user._id === post?.author._id && (
                <Button
                  variant="ghost"
                  className="cursor-pointer w-fit"
                  onClick={deletePostHandler}
                >
                  Delete
                </Button>
              )}
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={post.image}
        alt="post_image"
      />

      <div className="'flex items-center justify-between my-2'">
        <div className="flex items-center gap-3">
          <FaRegHeart size="22px" onClick={likeUnlikeHandler} />
          <MessageCircle
            className="cursor-pointer hover:text-gray-600"
            onClick={() => setOpen(true)}
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
      </div>
      <span className="font-medium block mb-2">{postLike} Likes</span>
      <p>
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post.caption}
      </p>
      <span
        className="cursor-pointer text-sm text-gray-400"
        onClick={() => setOpen(true)}
      >
        view all comments
      </span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex item-center justify-between">
        <input
          type="text"
          placeholder="Add to comments......"
          className="outline-none text-sm w-full"
          value={text}
          onChange={changeEventHandler}
        />
        {text && <span className="text-[#3BADF8] cursor-pointer">Send</span>}
      </div>
    </div>
  );
};
export default Post;
