export interface QuizApiQuestion {
  id: number;
  question: string;
  description: string | null;
  answers: {
    answer_a: string | null;
    answer_b: string | null;
    answer_c: string | null;
    answer_d: string | null;
    answer_e: string | null;
    answer_f: string | null;
  };
  multiple_correct_answers: string;
  correct_answers: {
    answer_a_correct: string;
    answer_b_correct: string;
    answer_c_correct: string;
    answer_d_correct: string;
    answer_e_correct: string;
    answer_f_correct: string;
  };
  category: string;
  difficulty: string;
  tags: string[];
}

const API_KEY = process.env.NEXT_PUBLIC_QUIZ_API_KEY;
const BASE_URL = "https://quizapi.io/api/v1";

export async function getQuizzes(
  category?: string,
  difficulty?: string,
  limit: number = 10
) {
  const params = new URLSearchParams({
    apiKey: API_KEY!,
    limit: limit.toString(),
    ...(category && { category }),
    ...(difficulty && { difficulty }),
  });

  const response = await fetch(`${BASE_URL}/questions?${params}`);
  const data = await response.json();
  return data;
}

export const categories = [
  "Linux",
  "Bash",
  "Docker",
  "SQL",
  "CMS",
  "Code",
  "DevOps",
];

export const difficulties = ["Easy", "Medium", "Hard"];
export function convertApiQuestion(apiQuestion: QuizApiQuestion) {
  const options = Object.values(apiQuestion.answers).filter(
    (value) => value !== null
  ) as string[];

  const correctAnswerIndex = Object.values(
    apiQuestion.correct_answers
  ).findIndex((value) => value === "true");

  return {
    id: apiQuestion.id,
    question: apiQuestion.question,
    options,
    correctAnswer: correctAnswerIndex,
    category: apiQuestion.category,
    difficulty: apiQuestion.difficulty,
    tags: apiQuestion.tags,
  };
}
