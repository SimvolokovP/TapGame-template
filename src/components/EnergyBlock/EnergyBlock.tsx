import "./EnergyBlock.scss";
import { FC } from "react";
import { MAX_ENERGY } from "../../utils/MAX_ENERGY";
import { RiFlashlightLine } from "react-icons/ri";

interface EnergyBlockProps {
  energy: number;
  // increaseEnergy: () => void;
}

const EnergyBlock: FC<EnergyBlockProps> = ({ energy }) => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     increaseEnergy();
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [energy, increaseEnergy]);

  return (
    <div className="energy">
      <div className="energy__count">
        {energy} / {MAX_ENERGY}
      </div>
      <RiFlashlightLine size={25} />
    </div>
  );
};

export default EnergyBlock;
