import {
  RiBankCardLine,
  RiGroupLine,
  RiHome2Line,
  RiTaskLine,
} from "react-icons/ri";

export const navLinks = [
  {
    to: "/",
    text: "home",
    icon: RiHome2Line,
  },
  {
    to: "/tasks",
    text: "tasks",
    icon: RiTaskLine,
  },
  {
    to: "/team",
    text: "team",
    icon: RiGroupLine,
  },
  // {
  //   to: "/team",
  //   text: "wallet",
  //   icon: RiBankCardLine,
  // },
];

export const getUsername = (tgUser) => {
  if (tgUser) {
    return (
      tgUser?.username ||
      `${tgUser?.firstName || ""} ${tgUser?.lastName || ""}`.trim()
    );
  }
  return "Unknown";
};
