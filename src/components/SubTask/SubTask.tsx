import { useCallback, useState } from "react";
import { useTg } from "../../hooks/telegram/useTg";
import { openTelegramLink } from "@telegram-apps/sdk";
import { toast, ToastContainer } from "react-toastify";
import { checkSubscriptionStatus } from "../../api/telegram/telegramApi";

import "./SubTask.scss";
import { BiTask } from "react-icons/bi";

const SubTask = () => {
  const { tgUser } = useTg();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const notify = (message: string) => toast(message);

  const handleCheckSubscription = useCallback(async () => {
    setIsLoading(true);
    let message = "";
    const chat = import.meta.env.VITE_CHAT_ID;
    try {
      if (tgUser) {
        const { isSub, status } = await checkSubscriptionStatus(tgUser, chat);

        if (!isSub) {
          message = "Sorry, you are not subscribed to our channel.";
          openTelegramLink(`https://t.me/${chat}`);
        } else {
          message = `You are the ${status} of the channel.`;
          //   openTelegramLink(`https://t.me/${chat}`);
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
      <div>
        <button className="sub-task" onClick={handleCheckSubscription}>
          <BiTask size={24} />
          {isLoading ? "loading.." : "Check Subscription"}
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default SubTask;
