import "./Greeting.scss";
import { useTg } from "../../hooks/telegram/useTg";
import { getUsername } from "../../utils/utils";
import { GiBatMask } from "react-icons/gi";
import { FC } from "react";

const Greeting:FC = () => {
  const { tgUser } = useTg();

  return (
    <div className="greeting container">
      <GiBatMask size={32} />
      <h1 className="greeting__title">
        {getUsername(tgUser)} <span>Welcome back</span>
      </h1>
    </div>
  );
};

export default Greeting;
