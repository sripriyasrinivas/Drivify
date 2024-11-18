import React, { useState } from 'react';
import './Quiz.css';
import QuestionBubble from './QuestionBubble';
import Timer from './Timer';

const Quiz = () => {
  const questions = [
    {
      _id: '1',
      text: 'Near a pedestrian crossing, when pedestrians are waiting to cross the road, you should...',
      options: [
        'Sound horn and proceed',
        'Slow down, sound horn and pass',
        'Stop the vehicle and wait till the pedestrians cross the road and then proceed',
      ],
    },
    {
      _id: '2',
      text: 'The following sign represents...',
      image: '/q2.png', // Image URL relative to public folder
      options: ['Stop', 'No parking', 'Hospital ahead'],
    },
    {
      _id: '3',
      text: 'You are approaching a narrow bridge. Another vehicle is about to enter the bridge from opposite side. You should...',
      options: [
        'Increase the speed and try to cross the bridge as fast as possible',
        'Put on the head light and pass the bridge',
        'Wait till the other vehicle crosses the bridge and then proceed',
      ],
    },
    {
      _id: '4',
      text: 'The following sign represents...',
      image: '/q4.png', // Image URL relative to public folder
      options: ['Keep left', 'There is no road to the left', 'Compulsory turn left'],
    },
    {
      _id: '5',
      text: 'When a vehicle is involved in an accident causing injury to any person...',
      options: [
        'Take the vehicle to the nearest police station and report the accident',
        'Stop the vehicle and report to the police station',
        'Take all reasonable steps to secure medical attention for the injured and report to the nearest police station within 24 hours',
      ],
    },
    {
      _id: '6',
      text: 'The following sign represents...',
      image: '/q6.png', // Image URL relative to public folder
      options: ['Give way', 'Hospital ahead', 'Traffic island ahead'],
    },
    {
      _id: '7',
      text: 'On a road designated as one way...',
      options: [
        'Parking is prohibited',
        'Overtaking is prohibited',
        'Should not drive in reverse gear',
      ],
    },
    {
      _id: '8',
      text: 'The following sign represents...',
      image: '/q8.png', // Image URL relative to public folder
      options: ['No entry', 'One way', 'Speed limit ends'],
    },
    {
      _id: '9',
      text: 'You can overtake a vehicle...',
      options: [
        'Through the right side of the vehicle',
        'Through the left side',
        'Through the left side, if the road is wide',
      ],
    },
    {
      _id: '10',
      text: 'The following sign represents...',
      image: '/q10.png', // Image URL relative to public folder
      options: ['Right turn prohibited', 'Sharp curve to the right', 'U-turn prohibited'],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [applicationId] = useState('PES120210001');

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleEndTest = () => {
    const payload = {
      applicationId,
      answers,
    };

    fetch('http://localhost:5000/api/tests/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          alert('Test submitted successfully!');
          window.location.reload(); // Refresh the page
        } else {
          alert('Error submitting test');
        }
      })
      .catch((err) => console.error(err));
  };

  const handleNavigate = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="test-header">
          <h1>Driving Licence Test</h1>
          <Timer duration={20 * 60} onTimeUp={handleEndTest} />
        </div>
      </header>
      <div className="test-body">
        <div className="question-section">
          {questions.length > 0 && (
            <div>
              <h3>
                {currentQuestionIndex + 1}. {questions[currentQuestionIndex].text}
              </h3>
              {questions[currentQuestionIndex].image && (
                <img
                  src={questions[currentQuestionIndex].image}
                  alt={`Question ${currentQuestionIndex + 1}`}
                  className="question-image"
                />
              )}
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      onChange={() =>
                        handleAnswer(questions[currentQuestionIndex]._id, option)
                      }
                      checked={answers[questions[currentQuestionIndex]._id] === option}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="navigation-section">
          <div className="bubble-navigation">
            {questions.map((question, index) => (
              <QuestionBubble
                key={question._id}
                number={index + 1}
                isAnswered={Boolean(answers[question._id])}
                onClick={() => handleNavigate(index)}
              />
            ))}
          </div>
          <button className="end-test" onClick={handleEndTest}>
            End Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;