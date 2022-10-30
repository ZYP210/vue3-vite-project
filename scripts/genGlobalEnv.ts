import fs from "fs";
import path from "path";
import { name } from "../package.json";
import colors from "picocolors";

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

//生成配置文件的名称
export function getGlobalEnvConfig() {
  const projectName = name;
  const prefixName = projectName.replace(/-/g, "_").toLocaleUpperCase();
  const outputFile = `${projectName}-config.js`;
  return { prefixName, outputFile };
}

/**
 * 生成全局配置文件
 */
export const genGlobalEnv = (env: ViteEnv) => {
  const { prefixName, outputFile } = getGlobalEnvConfig();
  const globalPrefix = `window.${prefixName}`;
  try {
    let configStr = `${globalPrefix}=${JSON.stringify(env)};`;
    configStr += `
          Object.freeze(${globalPrefix});
          Object.defineProperty(window, "${prefixName}", {
            configurable: false,
            writable: false,
          });
        `.replace(/\s/g, "");
    const outputPath = `public/${outputFile}`;
    fs.writeFileSync(getRootPath(outputPath), configStr);
    console.log(colors.cyan(`✨ 【${outputPath}】`) + `is build successfully:`);
  } catch (error) {
    console.log(colors.red("configuration file configuration file failed to package:\n" + error));
  }
};
