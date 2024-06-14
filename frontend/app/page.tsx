"use client";

import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Login />;
  }
  return (
    <>
      <Header />
      <main className="flex bg-gray-100">
        {/* Left Side Bar */}
        <Sidebar />
        {/* Feed(Create Post and Posts) */}
        <Feed />
        {/* Right Sidebar */}
        <RightSidebar />
      </main>
    </>
  );
}
