import { ITgUser } from "../../models/ITgUser";

export const checkSubscriptionStatus = async (tgUser: ITgUser) => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${
        import.meta.env.VITE_TG_TOKEN
      }/getChatMember?chat_id=${import.meta.env.VITE_CHAT_ID}&user_id=${
        tgUser?.id
      }`
    );
    const dataResp = await response.json();

    if (!dataResp.ok) {
      console.error(
        "Error fetching subscription status:",
        dataResp.description
      );
      throw new Error("An error has occurred. Try again later");
    }

    const status = dataResp.result.status;

    const isSub = ["member", "administrator", "creator"].includes(status);

    return { status, isSub };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error has occurred. Try again later");
  }
};
