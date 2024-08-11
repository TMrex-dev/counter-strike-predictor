import React, { useState } from 'react';
import TeamInput from './TeamInput';
import QuestionForm from './QuestionForm';
import Result from './Result';
import Header from './Header';
import './App.css';

const questions = [
  "Sufficient Practice: {team} has had significant time to practice before coming into the tournament.",
  "No Role Clashes: Roles within {team} are clear with no problematic overlaps.",
  "No Internal Drama: Players in {team} get along and the environment is positive.",
  "Effective support group: The coach, analysts, and sports psychologists of {team} are present and are helpful to the players.",
  "Better record against opposing team: {team} has overall better head-to-head or winning record against {opponent}.",
  "No bad record against opposing team: {team} does not have a noticeable worse record against {opponent}.",
  "Strong core: There exists at least 3 players in {team} with good to excellent impact against {opponent}'s level of competition or better impact than {opponent}.",
  "Strong support group: Including the strong core, there exists at least 4 players in {team} with decent impact against {opponent}'s level of competition better impact against {opponent}.",
  "Unknown quantity: {team} has not been extensively studied or has a large sample of games to be looked at.",
  "Major win rate: {team} has a significant high win rate of 62% or higher. Adjust for skew.",
  "Passable win rate: {team} does not have a win rate lower than 53%.",
  "{team}'s permaban is effective, banning one of {opponent}'s best maps.",
  "{team} has a better win rate on the majority of the maps. Adjust for skew.",
  "{team} has had more time to prepare for the match than {opponent}.",
  "{team} has considerably more experience than {opponent}."
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
    const opponent = teams.evaluatedTeam === teams.team1 ? teams.team2 : teams.team1;
    return question.replace(/{team}/g, teams.evaluatedTeam).replace(/{opponent}/g, opponent);
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
            question={formatQuestion(questions[currentQuestion])}
            onAnswer={handleAnswer}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
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