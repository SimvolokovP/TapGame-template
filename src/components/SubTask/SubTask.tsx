import { useCallback } from "react";
import { useTg } from "../../hooks/telegram/useTg";
import { openTelegramLink } from "@telegram-apps/sdk";
import { toast, ToastContainer } from "react-toastify";

import "./SubTask.scss";
import { BiTask } from "react-icons/bi";

const SubTask = () => {
  const { tgUser } = useTg();

  const notify = (message: string) => toast(message);

  const handleCheckSubscription = useCallback(async () => {
    try {
      let message = "";
      const response = await fetch(
        `https://api.telegram.org/bot${
          import.meta.env.VITE_TG_TOKEN
        }/getChatMember?chat_id=${import.meta.env.VITE_CHAT_ID}&user_id=${
          tgUser?.id
        }`
      );
      const dataResp = await response.json();

      if (dataResp.ok) {
        const status = dataResp.result.status;

        if (
          status === "member" ||
          status === "administrator" ||
          status === "creator"
        ) {
          message = `You are the ${status} of the channel.`;
        } else {
          message = `Sorry, you are not subscribed to our channel.`;
          openTelegramLink(`https://t.me/+3CTsGMpjhR5hOTky`);
        }
      } else {
        console.error(
          "Error fetching subscription status:",
          dataResp.description
        );
        message = "An error has occurred. Try again later";
      }
      notify(message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error has occurred. Try again later");
    }
  }, [tgUser]);
  return (
    <>
      <div>
        <button className="sub-task" onClick={handleCheckSubscription}>
          <BiTask size={24} />
          check sub
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default SubTask;
