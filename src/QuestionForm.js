import React, { useState } from 'react';

const QuestionForm = ({ questions, onSubmit, teams }) => {
  const [answers, setAnswers] = useState(
    questions.map(() => ({ team1: false, team2: false }))
  );
  
  const handleChange = (questionIndex, team, checked) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {
      ...newAnswers[questionIndex],
      [team]: checked
    };
    setAnswers(newAnswers);
  };

  return (
    <div className="question-form">
      <div style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr 1fr',
        gap: '20px',
        alignItems: 'start',
        textAlign: 'left',
        marginBottom: '30px'
      }}>
        {/* Column Headers */}
        <div style={{ 
          padding: '15px',
          background: '#2c3e50',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Questions
        </div>
        <div style={{ 
          padding: '15px',
          background: '#2c3e50',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {teams?.team1 || 'Team 1'}
        </div>
        <div style={{ 
          padding: '15px',
          background: '#2c3e50',
          color: 'white',
          borderRadius: '5px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {teams?.team2 || 'Team 2'}
        </div>

        {/* Questions and Checkboxes */}
        {questions.map((question, index) => (
          <React.Fragment key={index}>
            <div style={{ 
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '5px',
              fontSize: '0.9em',
              lineHeight: '1.4'
            }}>
              {question}
            </div>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '5px'
            }}>
              <input
                type="checkbox"
                checked={answers[index].team1}
                onChange={(e) => handleChange(index, 'team1', e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
              />
            </div>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '5px'
            }}>
              <input
                type="checkbox"
                checked={answers[index].team2}
                onChange={(e) => handleChange(index, 'team2', e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      
      <button 
        onClick={() => onSubmit(answers)}
        style={{
          width: '100%',
          marginTop: '20px',
          padding: '15px',
          fontSize: '1.1em',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Submit Predictions
      </button>
    </div>
  );
};

export default QuestionForm;