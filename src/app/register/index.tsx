"use client";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setAuthData } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(`Registration failed ${response.data.message}`);
      }

      const { token, tokenExpires, user } = response.data;

      dispatch(setAuthData({ token, tokenExpires, user }));

      setError(null);

      // TODO add redirection to test start page if user has test data, else redirect to homepage
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.statusText || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  function handleLoginRedirect(): void {
    router.push("/login");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button className="w-full" type="submit" variant="default">
          Register
        </Button>
      </form>
      <div className="mt-4 flex flex-row items-center justify-center">
        <p className="text-gray-700">Already a member?</p>
        <Button onClick={handleLoginRedirect} variant="link">
          Login here
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
