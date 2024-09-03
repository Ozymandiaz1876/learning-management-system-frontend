"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios, { isAxiosError } from "axios";
import { setTestDetails } from "@/app/store/testSlice";
import { RootState } from "@/app/store";
import { isAuthenticated } from "@/lib/utils";

const UniqueURLPage = ({ uniqueURLId }: { uniqueURLId: string }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const testDetails = useSelector((state: RootState) => state.test);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        if (uniqueURLId) {
          // Store the uniqueURLId in the Redux store, if in case
          dispatch(
            setTestDetails({
              uniqueURLId,
            })
          );
        }

        if (!isAuthenticated(authState)) {
          router.push("/login");
        }

        const response = await axios({
          method: "GET",
          baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          url: `/tests/${uniqueURLId ? uniqueURLId : ""}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
        });
        const data = response.data;

        console.log(data);

        dispatch(
          setTestDetails({
            uniqueURLId,
            testId: data._id,
            title: data.title,
            description: data.description,
          })
        );
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError(
              "Test data cannot be fetched. Please check the URL or ask your invigilator to confirm the URL."
            );
          }
        }
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, [uniqueURLId, dispatch, router, authState]);

  const handleStartTest = () => {
    router.push(`/test/start/${uniqueURLId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {error ? (
        <div className="text-red-500">
          <p>{error}</p>
        </div>
      ) : testDetails ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {testDetails.title || "Test Details"}
          </h1>
          <p>{testDetails.description}</p>
          <button
            onClick={handleStartTest}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Test
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UniqueURLPage;
