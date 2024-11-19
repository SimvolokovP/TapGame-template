import { FC } from "react";
import { useTg } from "../../hooks/telegram/useTg";
import { popup } from '@telegram-apps/sdk-react'

const ClipBoard: FC = () => {
  const { tgUser } = useTg();

  const handleCopyLink = async () => {
    const inviteLink = `${import.meta.env.VITE_TG_INVITE_URL}?startapp=${
      tgUser?.id
    }`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      popup.open({
        message: "Link successfully copied",
      })
    } catch (error) {
      console.error("Copy Error:", error);
      popup.open({
        message: "Failed to copy link",
      })
    }
  };

  return (
    <button className="common-btn" onClick={handleCopyLink}>
      Copy referal link
    </button>
  );
};

export default ClipBoard;
