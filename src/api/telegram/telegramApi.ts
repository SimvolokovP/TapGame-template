import { ITgUser } from "../../models/ITgUser";

export const checkSubscriptionStatus = async (
  tgUser: ITgUser,
  chat: string
) => {
  try {
    let formattedChat = chat;
    if (!chat.startsWith("@") && !chat.startsWith("-100")) {
      formattedChat = "@" + chat;
    }

    console.log(formattedChat);

    const response = await fetch(
      `https://api.telegram.org/bot${
        import.meta.env.VITE_TG_TOKEN
      }/getChatMember?chat_id=${formattedChat}&user_id=${tgUser?.id}`
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
