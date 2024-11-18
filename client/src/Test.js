import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from './Timer';
import Question from './Question';
import './Test.css';

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [applicationId] = useState('USER_APP_ID'); // Replace with dynamic user ID if available

  useEffect(() => {
    // Fetch questions when the component mounts
    axios.get('/api/tests/questions').then((response) => {
      setQuestions(response.data);
    });
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    axios.post('/api/tests/submit', { applicationId, answers }).then((response) => {
      alert(response.data.message || 'Test submitted successfully!');
      window.location.reload(); // Reload to reset
    });
  };

  return (
    <div className="test-container">
      <header>
        <h1>Online Quiz</h1>
        <Timer duration={20 * 60} onTimeUp={handleSubmit} />
      </header>
      <div className="questions-container">
        {questions.map((question, index) => (
          <Question
            key={question._id}
            question={question}
            index={index}
            selectedAnswer={answers[question._id]}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </div>
      <footer>
        <button className="submit-button" onClick={handleSubmit}>
          End Test
        </button>
      </footer>
    </div>
  );
};

export default Test;