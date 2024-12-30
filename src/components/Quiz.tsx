import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer, AlertCircle, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from 'next/navigation';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  category: string;
  difficulty: string;
}

const Quiz = ({ questions, category, difficulty }: QuizProps) => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowWarning(false);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
    setShowWarning(false);
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestionIndex] === -1) {
      setShowWarning(true);
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowWarning(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswers.includes(-1)) {
      setShowWarning(true);
      return;
    }

    setIsSubmitting(true);
    
    // Create a random ID for the quiz
    const quizId = Math.random().toString(36).substring(7);
    
    // Use the new app router navigation
    router.push(
      `/quiz/${quizId}/results?results=${encodeURIComponent(
        JSON.stringify({
          questions,
          answers: selectedAnswers,
          timeTaken: timeElapsed,
          category,
          difficulty,
        })
      )}`
    );
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Quiz Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              
              <h1 className="text-3xl font-bold mb-2 text-red-800">
                {category} Quiz
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium capitalize">
                  {difficulty}
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-2 text-lg bg-gray-100 px-4 py-2 rounded-full">
              <Timer className="w-5 h-5 text-gray-600" />
              <span className="font-mono text-gray-800">{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <Progress value={progress} className="h-3 bg-gray-100" />
        </div>

        {/* Question Card */}
        <Card className="mb-6 shadow-lg border-none">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl text-gray-800 flex items-start gap-2">
              {currentQuestion.question}
              {currentQuestion.explanation && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-5 h-5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{currentQuestion.explanation}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                  className={`
                    w-full justify-start text-left h-auto py-6 px-6 text-lg
                    transition-all duration-200
                    ${selectedAnswers[currentQuestionIndex] === index 
                      ? 'bg-blue-500 text-white shadow-md transform scale-[1.02]' 
                      : 'hover:bg-gray-50 hover:border-blue-200'}
                  `}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="mr-4 text-sm opacity-70">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Alert */}
        {showWarning && (
          <Alert variant="destructive" className="mb-6 animate-shake">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please select an answer before proceeding.
            </AlertDescription>
          </Alert>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6"
          >
            Previous
          </Button>
          <div className="space-x-3">
            {currentQuestionIndex < questions.length - 1 ? (
              <Button onClick={handleNext} className="px-6 bg-blue-500 hover:bg-blue-600">
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 bg-green-500 hover:bg-green-600"
              >
                {isSubmitting ? 'Submitting...' : 'Finish Quiz'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;