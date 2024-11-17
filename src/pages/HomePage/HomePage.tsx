import "./HomePage.scss";
import { useEffect, useState } from "react";
import ClickerBtn from "../../components/ClickerBtn/ClickerBtn";
import Greeting from "../../components/Greeting/Greeting";
import ScoreBlock from "../../components/ScoreBlock/ScoreBlock";
import EnergyBlock from "../../components/EnergyBlock/EnergyBlock";
import { MAX_ENERGY } from "../../utils/MAX_ENERGY";
import useUser from "../../hooks/user/useUser";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const HomePage = () => {
  const [localCoins, setLocalCoins] = useState<number>(0);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { user, updateUserScore, status } = useUser();
  const [energy, setEnergy] = useState<number>(100);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      if (user) {
        setTotalCoins(user?.score);
      } else {
        setTotalCoins(0);
      }
    };

    fetchCoins();
  }, [user]);

  useEffect(() => {
    setIsActive(true);
    console.log("use effect start: " + localCoins);
    const updateScore = async () => {
      console.log("loc" + localCoins);
      if (localCoins > 0) {
        const newScore = totalCoins + localCoins;
        try {
          console.log("update!");
          await updateUserScore(newScore);
          setTotalCoins(newScore);
          setLocalCoins(0);
        } catch (error) {
          console.error("Error updating coins:", error);
          setError("Ошибка обновления счета. Пожалуйста, попробуйте еще раз.");
        }
      } else {
        setIsActive(false);
      }
    };

    const interval = setInterval(() => {
      updateScore();
    }, 3000);

    return () => clearInterval(interval);
  }, [localCoins, totalCoins]);

  const increaseScore = () => {
    if (energy > 0) {
      setLocalCoins((prev) => {
        const newCoins = prev + 1;
        return newCoins;
      });
    }
  };

  const decreaseEnergy = () => {
    if (energy > 0) {
      setEnergy((prev) => prev - 1);
    }
  };

  const handleSetMessages = (
    setMessages: React.Dispatch<
      React.SetStateAction<{ id: number; x: number; y: number }[]>
    >,
    counter: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (energy > 0) {
      setMessages((prev) => [
        ...prev,
        { id: counter, x: event.clientX, y: event.clientY },
      ]);
    }
  };

  const increaseEnergy = () => {
    if (energy < MAX_ENERGY) {
      setEnergy((prev) => prev + 1);
    }
  };

  return (
    <div className="container home-page">
      {status.loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Greeting />
          <EnergyBlock energy={energy} increaseEnergy={increaseEnergy} />
          <ClickerBtn
            increaseScore={increaseScore}
            decreaseEnergy={decreaseEnergy}
            handleSetMessages={handleSetMessages}
            isActive={isActive}

            
          />
          <ScoreBlock score={totalCoins + localCoins} />
          {error && <div className="error-message">{error}</div>}
          <div
            style={isActive ? { opacity: 0.8 } : { opacity: 0 }}
            className={
              isActive
                ? "home-page__blur home-page__blur--1 home-page__active"
                : "home-page__blur home-page__blur--1"
            }
          ></div>
          <div
            style={isActive ? { opacity: 0.8 } : { opacity: 0 }}
            className={
              isActive
                ? "home-page__blur home-page__blur--2 home-page__active"
                : "home-page__blur home-page__blur--2"
            }
          ></div>

          
        </>
      )}
    </div>
  );
};

export default HomePage;
