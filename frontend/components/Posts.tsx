import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { addAllPost, selectPost } from "@/lib/features/postSlice";
import { useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post";
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);

  useEffect(() => {
    const fetchData = () => {
      const response = axios
        .get(FACEBOOK_CLONE_ENDPOINT)
        .then((response: any) => {
          dispatch(addAllPost(response.data));
        })
        .catch((err: any) => {
          alert("Some error occurred while gettign the data");
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {posts.map((post: any) => (
        <Post post={post} key={post?.id} />
      ))}
    </div>
  );
};
export default Posts;
