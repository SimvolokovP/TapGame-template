import { useEffect, useState } from "react";
import useUser from "./useUser";

const useScore = () => {
  const { user, updateUserScore, status } = useUser();
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [totalEnergy, setTotalEnergy] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setTotalCoins(user?.score);
      setTotalEnergy(user.energy);
    } else {
      setTotalCoins(0);
      setTotalEnergy(0);
    }
  }, [user]);

  const updateScore = async (localCoins: number) => {
    if (localCoins > 0) {
      const newScore = totalCoins + localCoins;
      try {
        await updateUserScore(localCoins);
        setTotalCoins(newScore);
        return true;
      } catch (error) {
        console.error("Error updating coins:", error);
        setError("Ошибка обновления счета. Пожалуйста, попробуйте еще раз.");
        return false;
      }
    }
    return false;
  };

  return { totalCoins, totalEnergy, updateScore, error, status, setTotalEnergy };
};

export default useScore;
