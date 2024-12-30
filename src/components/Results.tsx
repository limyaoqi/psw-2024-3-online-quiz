import { Question } from '@/types/quiz';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface ResultsProps {
  questions: Question[];
  answers: number[];
}

const Results = ({ questions, answers }: ResultsProps) => {
  const router = useRouter()
  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (question.correctAnswer === answers[index] ? 1 : 0);
    }, 0);
  };

  const score = calculateScore();
  const percentage = (score / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">{score}/{questions.length}</p>
            <p className="text-xl text-gray-600">{percentage.toFixed(1)}%</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {answers[index] === question.correctAnswer ? (
                  <CheckCircle className="text-green-500 mt-1" />
                ) : (
                  <XCircle className="text-red-500 mt-1" />
                )}
                <div className="flex-1">
                  <p className="font-medium mb-4">{question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-100'
                            : optionIndex === answers[index]
                            ? 'bg-red-100'
                            : 'bg-gray-50'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default Results;