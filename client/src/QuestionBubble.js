import React from 'react';

const QuestionBubble = ({ number, isAnswered, onClick }) => {
  return (
    <button
      className={`bubble ${isAnswered ? 'answered' : ''}`}
      onClick={onClick}
    >
      {number}
    </button>
  );
};

export default QuestionBubble;