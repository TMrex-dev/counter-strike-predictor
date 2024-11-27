import React, { useState } from 'react';
import TeamInput from './TeamInput';
import QuestionForm from './QuestionForm';
import Result from './Result';
import Header from './Header';
import './App.css';

const questions = [
  "Sufficient Practice: The team has had significant time to practice before coming into the tournament.",
  "No Role Clashes: Roles within the team are clear with no problematic overlaps.",
  "No Internal Drama: Players in the team get along and the environment is positive.",
  "Effective support group: The coach, analysts, and sports psychologists of {team} are present and are helpful to the players.",
  "Better record against opposing team: Team has overall better head-to-head or winning record against the opposing team.",
  "No bad record against opposing team: Team does not have a noticeable worse record against the opposing team.",
  "Strong core: There exists at least 3 players in the team with good to excellent impact against the opposing team level of competition.",
  "Strong support group: Including the strong core, there exists at least 4 players in the team with decent impact against their opponent's level of competition.",
  "Unknown quantity: The team has not been extensively studied or has a large sample of games to be looked at.",
  "Major win rate: The team has a significant high win rate of 60% or higher. Adjust for skew.",
  "Passable win rate: The team does not have a win rate lower than 53%.",
  "The team's permaban is effective, banning one of their opponent's best maps.",
  "The team has a better win rate on the majority of the maps. Adjust for skew.",
  "The team has had more time to prepare for the match than the opposing team",
  "The team has considerably more experience than the opposing team."
];

function App() {
  const [teams, setTeams] = useState({ team1: '', team2: '', evaluatedTeam: '' });
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleTeamSubmit = (team1, team2, evaluatedTeam) => {
    setTeams({ team1, team2, evaluatedTeam });
  };

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetPrediction = () => {
    setTeams({ team1: '', team2: '', evaluatedTeam: '' });
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const formatQuestion = (question) => {
    return question.replace(/{team}/g, '').replace(/{opponent}/g, '');
  };

  return (
    <div className="App">
      <Header />
      <div className="description">
        <p>Choose a team in an upcoming Counter Strike match and answer 15 true or false questions. If the majority of the answers are false the team loses. Use recent results and stats if possible.</p>
      </div>
      <div className="content">
      {!teams.evaluatedTeam ? (
        <TeamInput onSubmit={handleTeamSubmit} />
      ) : !showResult ? (
        <QuestionForm
          questions={questions.map(q => formatQuestion(q))}
          onSubmit={(answers) => {
            setAnswers(answers);
            setShowResult(true);
          }}
          teams={teams}
        />
      ) : (
        <Result
          teams={teams}
          answers={answers}
          onReset={resetPrediction}
        />
      )}
      </div>
    </div>
  );
}

export default App;