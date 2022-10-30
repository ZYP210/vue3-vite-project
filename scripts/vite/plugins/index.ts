import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from "unplugin-auto-import/vite";
import ComponentImport from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import type { Plugin } from "vite";
import { configHtmlPlugin } from "./htmlPlugin";

export const createVitePlugins = (viteEnv: ViteEnv, isBuild: boolean) => {
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx(),
    //在setup上使用name：<script lang="ts" setup name="App">
    vueSetupExtend(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      dts: "./types/auto-imports.d.ts",
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
    }),
    ComponentImport({
      dts: "./types/components.d.ts",
      resolvers: [AntDesignVueResolver({ importStyle: "less" })],
    }),
    configHtmlPlugin(viteEnv, isBuild),
  ];
  return vitePlugins;
};
