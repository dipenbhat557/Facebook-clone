import { addPost } from "@/lib/features/postSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const CreatePost = () => {
  const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post";
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [imageToPost, setImageToPost] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    hiddenFileInput?.current?.click();
  };

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageToPost(event.target.result as string);
        }
      };
    }
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputRef?.current?.value) return;
    const formData = new FormData();

    if (imageToPost) {
      formData.append("file", imageToPost);
    }
    formData.append("post", inputRef?.current?.value);
    formData.append("name", session?.user?.name ?? "");
    formData.append("email", session?.user?.email ?? "");
    formData.append("profilePic", session?.user?.image ?? "");

    axios
      .post(FACEBOOK_CLONE_ENDPOINT, formData, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        if (inputRef?.current) {
          inputRef.current.value = "";
        }
        dispatch(addPost(response.data));
        removeImage();
      })
      .catch((err) => {
        alert("Error occurred while submitting");
      });
  };

  return (
    <div className="bg-white rounded-md shadow-md text-gray-500 p-2">
      <div className="flex px-4 space-x-2 items-center">
        <Image
          src={session?.user?.image || ""}
          alt="facebook-logo"
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
        />
        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="rounded-full h-12 flex-grow focus:outline-none bg-gray-100 px-4"
            type="text"
            placeholder={`What's on your mind, ${session?.user?.name}`}
          />
          <button onClick={handleSubmit} hidden></button>
        </form>
      </div>

      {imageToPost && (
        <div
          onClick={removeImage}
          className="flex items-center px-4 py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer"
        >
          <img src={imageToPost} className="h-10 object-contain" alt="Post" />
          <RiDeleteBin2Line className="h-8 hover:text-red-500" />
        </div>
      )}

      <div className="flex justify-evenly py-2">
        <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer">
          <HiOutlineVideoCamera size={20} className="text-red-500" />
          <p className="font-semibold text-gray-600">Live Video</p>
        </div>
        <div
          onClick={handleClick}
          className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer"
        >
          <IoMdPhotos size={20} className="text-red-500" />
          <p className="font-semibold text-gray-600">Photo/Video</p>
          <input
            onChange={addImageToPost}
            ref={hiddenFileInput}
            type="file"
            hidden
            accept="image/*"
          />
        </div>
        <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer">
          <BsEmojiSmile size={20} className="text-red-500" />
          <p className="font-semibold text-gray-600">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
