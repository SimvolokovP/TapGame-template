import { useEffect, useState } from "react";
import ClickerBtn from "../../components/ClickerBtn/ClickerBtn";
import Greeting from "../../components/Greeting/Greeting";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ScoreBlock from "../../components/ScoreBlock/ScoreBlock";
import useUser from "../../hooks/user/useUser";
import "./HomePage.scss";
import EnergyBlock from "../../components/EnergyBlock/EnergyBlock";
import useEnergyStore from "../../store/useEnergyStore";

const HomePage = () => {
  const [localCoins, setLocalCoins] = useState<number>(0);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUserScore, status } = useUser();

  const [isActive, setIsActive] = useState(false);

  const { energy, substructEnergy } = useEnergyStore();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setTotalCoins(user?.score);
      } else {
        setTotalCoins(0);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    setIsActive(true);
    const updateScore = async () => {
      if (localCoins > 0) {
        const newScore = totalCoins + localCoins;

        try {
          await updateUserScore(newScore);
          setTotalCoins(newScore);
          setLocalCoins(0);
        } catch (error) {
          console.error("Error updating coins:", error);
          setError("Error updating coins. Please try again later.");
        }
      } else {
        setIsActive(false);
      }
    };

    const interval = setInterval(() => {
      updateScore();
    }, 300);

    return () => clearInterval(interval);
  }, [localCoins, totalCoins]);

  const increaseScore = () => {
    if (energy && energy > 0) {
      substructEnergy();
      setLocalCoins((prev) => {
        const newCoins = prev + 1;

        return newCoins;
      });
    }
  };

  return (
    <div className="container home-page">
      {status.loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Greeting />
          <EnergyBlock />
          <ClickerBtn increaseScore={increaseScore} isActive={isActive} />
          <ScoreBlock score={totalCoins + localCoins} />
          {error && <div className="error-message">{error}</div>}
          <div
            className={
              isActive
                ? "home-page__blur--active home-page__blur home-page__blur--1"
                : "home-page__blur home-page__blur--1"
            }
          ></div>
          <div
            className={
              isActive
                ? "home-page__blur--active home-page__blur home-page__blur--2"
                : "home-page__blur home-page__blur--2"
            }
          ></div>
        </>
      )}
    </div>
  );
};

export default HomePage;
