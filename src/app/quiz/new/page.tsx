"use client";

import { useEffect, useState } from "react";
import Quiz from "@/components/Quiz";
import { getQuizzes, convertApiQuestion } from "@/services/quizApi";
import { useSearchParams, useRouter } from "next/navigation";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQuestions() {
      if (category && difficulty) {
        try {
          const apiQuestions = await getQuizzes(
            category as string,
            difficulty as string,
            10
          );
          const formattedQuestions = apiQuestions.map(convertApiQuestion);
          setQuestions(formattedQuestions);
        } catch (e) {
          console.error("Error loading quiz questions:", e);
          setError("Failed to load quiz questions");
        } finally {
          setLoading(false);
        }
      }
    }

    loadQuestions();
  }, [category, difficulty]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-xl mb-4">No questions available</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <Quiz
      questions={questions}
      category={category as string}
      difficulty={difficulty as string}
    />
  );
}
