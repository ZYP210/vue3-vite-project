/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { PluginOption } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import pkg from "../../../package.json";
import { getGlobalEnvConfig } from "../../genGlobalEnv";

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith("/") ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    const filename = `${path || "/"}${getGlobalEnvConfig().outputFile}?v=${pkg.version}-${new Date().getTime()}`;
    const scripts = `<script src="${filename}"></script>`;
    return scripts;
  };

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    entry: "src/main.ts",
    template: "index.html",
    inject: {
      data: {
        title: VITE_GLOB_APP_TITLE,
        injectScript: getAppConfigSrc(),
      },
    },
  });

  return htmlPlugin;
}
