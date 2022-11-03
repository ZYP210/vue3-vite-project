import type { RouteRecordRaw } from "vue-router";
import { loadView } from "@/utils";
export const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "login",
    component: loadView("/login/index"),
    meta: {
      title: "登陆页",
    },
  },
  {
    path: "/home",
    name: "home",
    component: loadView("/dashboard/index"),
    meta: {
      title: "首页",
    },
  },
];
