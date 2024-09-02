import React from "react";
import { Button } from "@/components/ui/button";

export const QuestionCard = ({ question, onAnswer }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">{question.text}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => onAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};
