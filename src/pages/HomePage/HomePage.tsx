import { useState } from "react";
import ClickerBtn from "../../components/ClickerBtn/ClickerBtn";
import Greeting from "../../components/Greeting/Greeting";
import ScoreBlock from "../../components/ScoreBlock/ScoreBlock";

const HomePage = () => {
  const [testScore, setTestScore] = useState<number>(0);

  const increaseScore = () => {
    setTestScore((score) => score + 1);
  };

  return (
    <div className="container">
      <Greeting />
      <ClickerBtn increaseScore={increaseScore} />
      <ScoreBlock score={testScore} />
    </div>
  );
};

export default HomePage;
