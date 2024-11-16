import { FC } from "react";
import { useTg } from "../../hooks/telegram/useTg";

const ClipBoard: FC = () => {
  const { tgUser } = useTg();

  const handleCopyLink = async () => {
    const inviteLink = `${import.meta.env.VITE_TG_INVITE_URL}?startapp=${
      tgUser?.id
    }`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert("Copy link");
    } catch (error) {
      console.error("Copy Error:", error);
      alert("Copy Error");
    }
  };

  return (
    <button className="common-btn" onClick={handleCopyLink}>
      Copy referal link
    </button>
  );
};

export default ClipBoard;
