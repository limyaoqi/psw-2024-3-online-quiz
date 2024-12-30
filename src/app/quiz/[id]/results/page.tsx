"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Results from "@/components/Results";
import { Question } from "@/types/quiz";

interface ResultsData {
  questions: Question[];
  answers: number[];
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);

  useEffect(() => {
    const results = searchParams.get("results");
    if (!results) {
      router.push("/");
      return;
    }

    try {
      const parsedResults: ResultsData = JSON.parse(results);
      setResultsData(parsedResults);
    } catch (error) {
      console.error("Failed to parse results:", error);
      router.push("/");
    }
  }, [searchParams, router]);

  if (!resultsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <Results {...resultsData} />;
}
