"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  setCurrentQuestion,
  clearCurrentQuestion,
} from "@/app/store/questionSlice";
import { clearTestDetails } from "@/app/store/testSlice";

const AnswerSchema = z.object({
  answer: z.string().nonempty({ message: "Please select an answer." }),
});

const TestStartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const testDetails = useSelector((state: RootState) => state.test);
  const authState = useSelector((state: RootState) => state.auth);
  const currentQuestion = useSelector(
    (state: RootState) => state.question.currentQuestion
  );

  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: answer,
    },
  });

  useEffect(() => {
    const startTest = async () => {
      try {
        const response = await axios({
          method: "POST",
          baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          url: `/tests/${testDetails.testId}/start`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
        });

        const initialQuestion = response.data;

        dispatch(
          setCurrentQuestion({
            currentQuestion: initialQuestion,
          })
        );
      } catch (error) {
        if (isAxiosError(error)) {
          setError("Error starting the test.");
        }
      }
    };

    if (testDetails.testId) {
      startTest();
    } else {
      setError("Test ID is missing.");
    }

    return () => {
      dispatch(clearCurrentQuestion());
    };
  }, [testDetails.testId, authState.token, dispatch]);

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !answer) {
      setError("Please select an answer.");
      return;
    }

    try {
      const response = await axios({
        method: "POST",
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        url: `/tests/${testDetails.testId}/questions/${currentQuestion.id}/answer`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        data: { answer },
      });

      const { question: nextQuestion } = response.data;
      if (nextQuestion) {
        dispatch(
          setCurrentQuestion({
            currentQuestion: nextQuestion,
          })
        );
        setAnswer("");
      } else {
        router.push("/");
        dispatch(clearTestDetails());
        dispatch(clearCurrentQuestion());
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError("Error submitting the answer.");
      }
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {currentQuestion ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitAnswer)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{currentQuestion.questionText}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setAnswer(value);
                      }}
                      className="flex flex-col space-y-1"
                    >
                      {currentQuestion.options.map((option: any) => (
                        <FormItem
                          key={option.text}
                          className="flex items-center space-x-3"
                        >
                          <Controller
                            control={form.control}
                            name="answer"
                            render={({ field }) => (
                              <>
                                <RadioGroupItem value={option.text} />
                                <FormLabel className="font-normal">
                                  {option.text}
                                </FormLabel>
                              </>
                            )}
                          />
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Next
            </Button>
          </form>
        </Form>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default TestStartPage;
