import React from 'react';

const Question = ({ question, index, selectedAnswer, onAnswerChange }) => {
  return (
    <div className="question">
      <p>{index + 1}. {question.text}</p>
      {question.options.map((option, idx) => (
        <label key={idx}>
          <input
            type="radio"
            name={`question-${question._id}`}
            value={option}
            checked={selectedAnswer === option}
            onChange={() => onAnswerChange(question._id, option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Question;