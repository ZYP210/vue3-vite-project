import type { App } from "vue";
import type { Router, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { baseRoutes } from "./baseRoutes";

const routes: Readonly<RouteRecordRaw[]> = [...baseRoutes];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});


export const setupRouter = (app: App<Element>) => {
  app.use(router);
};

export default router;
