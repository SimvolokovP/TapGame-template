import "./EnergyBlock.scss";
import { FC } from "react";
import { MAX_ENERGY } from "../../utils/MAX_ENERGY";
import { RiFlashlightLine } from "react-icons/ri";
import useEnergyStore from "../../store/useEnergyStore";

const EnergyBlock: FC = () => {
  const { energy } = useEnergyStore();

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
