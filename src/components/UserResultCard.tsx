import React from "react";
import { Button } from "@/components/ui/button";

export const UserResultCard = ({ result }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold">{result.name}</h2>
      <p className="text-gray-600">Score: {result.score}</p>
      <Button variant="secondary" className="mt-4">
        View Details
      </Button>
    </div>
  );
};
