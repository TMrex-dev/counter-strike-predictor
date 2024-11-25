import React from 'react';

const Result = ({ teams, answers, onReset }) => {
  const team1TrueCount = answers.filter(answer => answer.team1).length;
  const team2TrueCount = answers.filter(answer => answer.team2).length;
  const totalTrueCount = team1TrueCount + team2TrueCount;
  
  const team1Probability = totalTrueCount > 0 ? (team1TrueCount / totalTrueCount) * 100 : 0;
  const team2Probability = totalTrueCount > 0 ? (team2TrueCount / totalTrueCount) * 100 : 0;
  
  const winner = team1TrueCount > team2TrueCount ? teams.team1 : 
                team2TrueCount > team1TrueCount ? teams.team2 : 
                'Tie';

  return (
    <div className="result p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>
      
      {winner === 'Tie' ? (
        <p className="text-lg mb-4">The analysis shows an even match between {teams.team1} and {teams.team2}.</p>
      ) : (
        <p className="text-lg mb-4">
          {winner} is predicted to win against {winner === teams.team1 ? teams.team2 : teams.team1}.
        </p>
      )}
      
      <div className="statistics space-y-2 mb-6">
        <h3 className="text-xl font-semibold">Statistics:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">{teams.team1}</h4>
            <p>True answers: {team1TrueCount}</p>
            <p>Win probability: {team1Probability.toFixed(2)}%</p>
          </div>
          <div>
            <h4 className="font-semibold">{teams.team2}</h4>
            <p>True answers: {team2TrueCount}</p>
            <p>Win probability: {team2Probability.toFixed(2)}%</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onReset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Make another prediction
      </button>
    </div>
  );
};

export default Result;