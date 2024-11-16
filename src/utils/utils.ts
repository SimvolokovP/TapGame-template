import { ITgUser } from "../models/ITgUser";

export const getUsername = (tgUser: ITgUser) => {
  if (tgUser) {
    return (
      tgUser?.username ||
      `${tgUser?.firstName || ""} ${tgUser?.lastName || ""}`.trim()
    );
  }
  return "Unknown";
};
