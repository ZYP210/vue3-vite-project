import { getGlobalEnvConfig } from "../../../scripts/genGlobalEnv";
const { prefixName } = getGlobalEnvConfig();
const config = window?.[prefixName] || {};
console.log(window[prefixName]);
export const GlobalConfig: Partial<ViteEnv> = {
  ...config,
};

export const useGlobalConfig = () => {
  return reactive<Partial<ViteEnv>>(GlobalConfig);
};
