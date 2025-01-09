import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await axios.get("http://localhost:8000/api/v1/post/all", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setPosts(res.data.posts));
        }
      };
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  }, []);
};
