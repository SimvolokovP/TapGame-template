import { shareURL } from "@telegram-apps/sdk";
import { FC } from "react";
import { useTg } from "../../hooks/telegram/useTg";

const ShareBtn: FC = () => {
  const { tgUser } = useTg();
  const handleInviteFriend = () => {
    if (shareURL.isAvailable()) {
      shareURL(
        `${import.meta.env.VITE_TG_INVITE_URL}?start=${tgUser?.id}`,
        "Check out this cool group!"
      );
    }

    // const inviteLink = `${INVITE_URL}=${tgUser?.id}`;
    // const shareText = `Check out this cool group!`;
    // const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
    //   inviteLink
    // )}&text=${encodeURIComponent(shareText)}`;
    // window.open(fullUrl);
  };

  return (
    <button className="common-btn" onClick={handleInviteFriend}>
      Share with friends
    </button>
  );
};

export default ShareBtn;
