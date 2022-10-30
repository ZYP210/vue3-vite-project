import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();

export function setupStore(app: App<Element>) {
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
}

export default pinia;
export * from "./modules/index";
