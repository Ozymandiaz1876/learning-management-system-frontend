"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the LMS</h1>
        <p className="text-gray-700 mb-6">
          {user.id && `Welcome back, ${user.firstName}!`}
          Please get a test link from your invigilator to start your test.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
