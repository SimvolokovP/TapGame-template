import "./EnergyBlock.scss";
import { FC } from "react";
import { RiFlashlightLine } from "react-icons/ri";
import useEnergyStore from "../../store/useEnergyStore";

const EnergyBlock: FC = () => {
  const { energy, maxEnergy } = useEnergyStore();

  return (
    <div className="energy">
      <div className="energy__count">
        {energy} / {maxEnergy}
      </div>
      <RiFlashlightLine size={25} />
    </div>
  );
};

export default EnergyBlock;
