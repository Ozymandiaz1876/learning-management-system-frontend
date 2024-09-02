import React from "react";
import { Button } from "@/components/ui/button";

export const TestCard = ({ test }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold">{test.name}</h2>
      <p className="text-gray-600">Questions: {test.questionCount}</p>
      <div className="mt-4 flex space-x-2">
        <Button variant="outline">View Results</Button>
        <Button variant="secondary">Manage Questions</Button>
      </div>
    </div>
  );
};
