import { useEffect, useState } from "react";
import UserService from "../../api/supabase/userApi";
import { IUser } from "../../models/IUser";
import { useTg } from "../telegram/useTg";

type OperationStatus = {
  loading: boolean;
  error: string | null;
};
const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [status, setStatus] = useState<OperationStatus>({
    loading: false,
    error: null,
  });

  const { tgUser } = useTg();

  const clearStatus = () => setStatus({ loading: false, error: null });

  const logIn = async (tg_id: number) => {
    clearStatus();
    setStatus((prev) => ({ ...prev, loading: true }));
    try {
      const loggedInUser = await UserService.logIn(tg_id);
      setUser(loggedInUser);
    } catch (err: any) {
      setStatus((prev) => ({ ...prev, error: err.message }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const updateUserScore = async (newScore: number) => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    clearStatus();
    setStatus((prev) => ({ ...prev, loading: true }));

    try {
      const updatedUser = await UserService.updateScore(user.tg_id, newScore);
      setUser(updatedUser); 
    } catch (err: any) {
      setStatus((prev) => ({ ...prev, error: err.message }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (tgUser) {
      logIn(tgUser?.id);
    }
  }, [tgUser?.id]);

  return { user, status, logIn, updateUserScore };
};

export default useUser;
