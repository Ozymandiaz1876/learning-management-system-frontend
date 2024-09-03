"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setAuthData } from "../store/authSlice";
import { AppDispatch, RootState } from "../store";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const uniqueURLId = useSelector((state: RootState) => state.test.uniqueURLId);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target?.email?.value || "";
    const password = e.target?.password?.value || "";

    try {
      const response = await axios({
        method: "POST",
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        url: "/auth/login",
        data: {
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error(`Login failed ${response.data.message}`);
      }

      const { token, tokenExpires, user } = response.data;
      // Dispatch action to store the data in Redux
      dispatch(
        setAuthData({
          token,
          tokenExpires,
          user,
        })
      );

      // if uniqueURLId is in the URL, redirect to that page, else go to home

      if (uniqueURLId) {
        router.push(`/test/${uniqueURLId}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.statusText);
      } else {
        console.error(error);
      }
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button className="w-full" type="submit" variant="default">
          Login
        </Button>
      </form>
      <div className="mt-4 flex flex-row items-center justify-center">
        <p className="text-gray-700">Not a member?</p>
        <Button onClick={handleRegisterRedirect} variant="link">
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
