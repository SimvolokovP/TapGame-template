import {
  RiBankCardLine,
  RiGroupLine,
  RiHome2Line,
  RiTaskLine,
} from "react-icons/ri";

export const routerLinks = [
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
  {
    to: "/wallet",
    text: "wallet",
    icon: RiBankCardLine,
  },
];
