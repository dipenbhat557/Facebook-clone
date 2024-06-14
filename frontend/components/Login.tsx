"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex flex-col items-center gap-24 mx-auto">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/800px-2021_Facebook_icon.svg.png"
        alt="facebook-logo"
        height={140}
        width={200}
      />
      <button
        onClick={() => signIn()}
        className="px-20 py-4 z-10 text-2xl cursor-pointer -mt-16 bg-blue-500 rounded-md text-white"
      >
        {" "}
        Login
      </button>
    </div>
  );
};
export default Login;
