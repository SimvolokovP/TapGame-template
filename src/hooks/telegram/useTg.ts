import { retrieveLaunchParams } from "@telegram-apps/sdk";

export const useTg = () => {
  const { initData } = retrieveLaunchParams();
  const tgUser = initData?.user;
  const queryId = initData?.queryId;
  return { initData, tgUser, queryId };
};
