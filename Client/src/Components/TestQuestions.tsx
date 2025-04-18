import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Question {
  question: string;
}

const TestQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [studentName, setStudentName] = useState('');
  const { hash } = useParams<{ hash: string }>();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/tests/questions/${hash}`);
        setTitle(response.data.title);
        setSubject(response.data.subject);
        setQuestions(response.data.questions);
        setAnswers(Array(response.data.questions.length).fill(''));
        setError(null);
      } catch (err) {
        setError('Failed to fetch questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    if (hash) {
      fetchQuestions();
    }
  }, [hash]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/v1/tests/submit/${hash}`, {
        studentName,
        submissions: questions.map((question, index) => ({
          question: question.question,
          answer: answers[index] || '',
        })),
      });
      console.log('Test submitted successfully:');
      alert(response.data.score);
      setError(null);
    } catch (err) {
      setError('Failed to submit test. Please try again later.');
      console.error('Error submitting test:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-medium">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Test Questions</h2>
      <h3 className="text-xl text-center text-gray-800 font-semibold mb-1">{title}</h3>
      <h4 className="text-center text-gray-500 mb-6">{subject}</h4>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        {questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 bg-blue-50 rounded-lg shadow-sm">
            <h3 className="font-semibold text-blue-800">Question {index + 1}</h3>
            <p className="mb-2 text-gray-800">{question.question}</p>
            <input
              type="text"
              placeholder="Answer"
              value={answers[index] || ''}
              onChange={e => handleAnswerChange(index, e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 bg-white"
            />
          </div>
        ))}
        <div className="mb-4">
          <label htmlFor="studentName" className="block mb-1 font-medium text-gray-700">Student Name:</label>
          <input
            type="text"
            id="studentName"
            placeholder="Enter your name"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 bg-white"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-lg shadow-md transition-colors duration-200 mt-2"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default TestQuestions;