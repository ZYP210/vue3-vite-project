import type { RouteRecordRaw } from "vue-router";

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/login/index.vue"),
    meta: {
      title: "首页",
    },
  }
];
