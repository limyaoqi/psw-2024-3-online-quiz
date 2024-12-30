import { NextResponse } from "next/server";

export async function GET() {
  // Static quiz data
  const quizData = [
    {
      question: "What is the capital of France?",
      answers: {
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
      },
      correct_answers: {
        c: "true",
      },
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: {
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Venus",
      },
      correct_answers: {
        b: "true",
      },
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answers: {
        a: "Harper Lee",
        b: "Mark Twain",
        c: "Jane Austen",
        d: "J.K. Rowling",
      },
      correct_answers: {
        a: "true",
      },
    },
  ];

  return NextResponse.json(quizData);
}
