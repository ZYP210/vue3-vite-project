import { fileURLToPath, URL } from "node:url";
import type { UserConfigExport, ConfigEnv } from "vite";
import { defineConfig, loadEnv } from "vite";
import { createProxy, parseEnv } from "./src/utils/dev";
import { genGlobalEnv } from "./scripts";
import { createVitePlugins } from "./scripts/vite/plugins";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  
  //格式化env
  const viteEnv = parseEnv(env);

  const isBuild = command === "build";
  //脚本生成配置文件js
  genGlobalEnv(viteEnv);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    root,
    plugins: createVitePlugins(viteEnv, isBuild),
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": fileURLToPath(new URL("./public", import.meta.url)),
      },
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
  });
};
