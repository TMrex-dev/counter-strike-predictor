import React from 'react';

function Result({ teams, answers, onReset }) {
  const trueCount = answers.filter(answer => answer === true).length;
  const falseCount = answers.filter(answer => answer === false).length;
  const bothFalseCount = answers.filter(answer => answer === 'both').length;
  const totalAnswers = answers.length - bothFalseCount;
  const winProbability = trueCount / totalAnswers;
  const winPrediction = winProbability > 0.5;

  return (
    <div className="result">
      <h2>Prediction Result</h2>
      <p>
        {teams.evaluatedTeam} is predicted to
        {winPrediction ? ' win ' : ' lose '}
        against {teams.evaluatedTeam === teams.team1 ? teams.team2 : teams.team1}.
      </p>
      <p>Statistics:</p>
      <ul>
        <li>True answers: {trueCount}</li>
        <li>False answers: {falseCount}</li>
        <li>Both false answers: {bothFalseCount}</li>
        <li>Total considered answers: {totalAnswers}</li>
        <li>Win probability: {(winProbability * 100).toFixed(2)}%</li>
      </ul>
      <button onClick={onReset}>Make another prediction</button>
    </div>
  );
}

export default Result;