import { FC } from "react";
import { RiCoinsLine } from "react-icons/ri";

import "./ScoreBlock.scss";

interface ScoreBlockProps {
  score: number;
}

// var(--tg-theme-accent-text-color)

const ScoreBlock: FC<ScoreBlockProps> = ({ score }) => {
  return (
    <div className="score-block">
      <RiCoinsLine color="" size={32} />
      <span className="score-block__text">{score}</span>
    </div>
  );
};

export default ScoreBlock;
