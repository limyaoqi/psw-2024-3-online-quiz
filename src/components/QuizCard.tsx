import { Quiz } from '@/types/quiz';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <Link href={`/quiz/${quiz.id}`} className="block no-underline">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {quiz.questions.length} questions
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default QuizCard;