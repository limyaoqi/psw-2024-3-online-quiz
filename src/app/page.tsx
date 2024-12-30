// app/page.tsx
"use client"

import { useState } from 'react';
import { categories, difficulties } from '@/services/quizApi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleStartQuiz = (category: string, difficulty?: string) => {
    // If no difficulty is provided, use 'medium' as default
    const quizDifficulty = difficulty || 'medium';
    router.push(`/quiz/new?category=${category.toLowerCase()}&difficulty=${quizDifficulty}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">Tech Quiz Challenge</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Choose Your Challenge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select onValueChange={setSelectedCategory} value={selectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                  
                ))}
              </SelectContent>
            </Select>
          </div>

          
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty</label>
            <Select onValueChange={setSelectedDifficulty} value={selectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty.toLowerCase()}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full"
            size="lg"
            onClick={() => handleStartQuiz(selectedCategory, selectedDifficulty)}
            disabled={!selectedCategory || !selectedDifficulty}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card key={category} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Test your knowledge in {category} with our curated questions.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleStartQuiz(category)}
              >
                Take {category} Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}