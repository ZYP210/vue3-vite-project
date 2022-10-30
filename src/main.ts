import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "@/router/index";
import { setupStore } from "@/stores/index";

import "./assets/less/index.less";

const app = createApp(App);

setupStore(app);

setupRouter(app);

app.mount("#app");
