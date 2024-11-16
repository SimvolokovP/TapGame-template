import { FC, useState } from "react";

import "./ClickerBtn.scss";

interface ClickerBtnProps {
  increaseScore: () => void;
}

const ClickerBtn: FC<ClickerBtnProps> = ({ increaseScore }) => {
  const [tilt, setTilt] = useState({ tiltX: "0deg", tiltY: "0deg" });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    const DEG = 45;
    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * -DEG;

    setTilt({ tiltX: `${tiltX}deg`, tiltY: `${tiltY}deg` });
    increaseScore();

    setTimeout(() => {
      setTilt({ tiltX: "0deg", tiltY: "0deg" });
    }, 300);
  };
  return (
    <div className="clicker-btn">
      <button
        className="clicker-btn__button"
        onClick={handleClick}
        style={{
          transform: `perspective(500px) rotateY(${tilt.tiltY}) rotateX(${tilt.tiltX})`,
        }}
      >
        <img className="clicker-btn__image" src="/batman.svg" alt="batman" />
      </button>
    </div>
  );
};

export default ClickerBtn;
