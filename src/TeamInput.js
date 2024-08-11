// TeamInput.js
import React, { useState } from 'react';

function TeamInput({ onSubmit }) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [evaluatedTeam, setEvaluatedTeam] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (team1 && team2 && evaluatedTeam) {
      onSubmit(team1, team2, evaluatedTeam);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="team-input">
      <input
        type="text"
        placeholder="Team 1"
        value={team1}
        onChange={(e) => setTeam1(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Team 2"
        value={team2}
        onChange={(e) => setTeam2(e.target.value)}
        required
      />
      <select
        value={evaluatedTeam}
        onChange={(e) => setEvaluatedTeam(e.target.value)}
        required
      >
        <option value="">Select team to evaluate</option>
        <option value={team1}>{team1}</option>
        <option value={team2}>{team2}</option>
      </select>
      <button type="submit">Start Prediction</button>
    </form>
  );
}

export default TeamInput;