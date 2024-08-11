import React from 'react';

function QuestionForm({ question, onAnswer, questionNumber, totalQuestions }) {
  return (
    <div className="question-form">
      <h2>Question {questionNumber} of {totalQuestions}</h2>
      <p>{question}</p>
      <div className="button-group">
        <button className="true-btn" onClick={() => onAnswer(true)}>True</button>
        <button className="false-btn" onClick={() => onAnswer(false)}>False</button>
        <button className="both-false-btn" onClick={() => onAnswer('both')}>False for both</button>
      </div>
    </div>
  );
}

export default QuestionForm;