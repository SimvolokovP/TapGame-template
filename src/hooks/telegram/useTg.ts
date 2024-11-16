import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { ITgUser } from "../../models/ITgUser";

export const useTg = () => {
  const { initData } = retrieveLaunchParams();
  const tgUser: ITgUser | undefined = initData?.user;
  const queryId = initData?.queryId;
  return { initData, tgUser, queryId };
};
