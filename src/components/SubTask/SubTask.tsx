import { FC, useCallback, useState } from "react";
import { useTg } from "../../hooks/telegram/useTg";
import { toast, ToastContainer } from "react-toastify";
import { checkSubscriptionStatus } from "../../api/telegram/telegramApi";
import { ClipLoader } from "react-spinners";

import "./SubTask.scss";

import { TbBrandTelegram } from "react-icons/tb";
import { openTelegramLink } from '@telegram-apps/sdk-react'

interface SubTaskProps {
  isTaskActive: boolean;
  taskAction: () => Promise<void>;
}

const SubTask: FC<SubTaskProps> = ({ isTaskActive, taskAction }) => {
  const { tgUser } = useTg();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const notify = (message: string) => toast(message);

  const handleCheckSubscription = useCallback(async () => {
    setIsLoading(true);
    let message = "";
    const chat = import.meta.env.VITE_CHAT_ID;
    try {
      if (tgUser) {
        if (isTaskActive) {
          const { isSub, status } = await checkSubscriptionStatus(tgUser, chat);

          if (!isSub) {
            message = "Sorry, you are not subscribed to our channel.";
            openTelegramLink(`https://t.me/${chat}`);
          } else {
            message = `You are the ${status} of the channel.`;
            await taskAction();
            //   openTelegramLink(`https://t.me/${chat}`);
          }
        } else {
          message = "You have already completed this task";
        }
        notify(message);
      }
    } catch (error) {
      notify((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [tgUser]);

  return (
    <>
      <button
        className={isTaskActive ? "sub-task-active sub-task" : "sub-task"}
        onClick={handleCheckSubscription}
      >
        <TbBrandTelegram size={32} />
        {isLoading ? (
          <ClipLoader size={32} color="fff" />
        ) : (
          <div className="sub-task__content">
            <div>Subscribe to our TG channel</div>
            <span>1000 coins</span>
          </div>
        )}
      </button>

      <ToastContainer />
    </>
  );
};

export default SubTask;
