export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }
  
  export interface Quiz {
    id: number;
    title: string;
    description: string;
    questions: Question[];
  }
  