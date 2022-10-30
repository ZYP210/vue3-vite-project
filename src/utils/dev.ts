import type { ProxyOptions } from "vite";

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

import { numberReg, objStrReg, arrayStrReg, doubleArrayStrReg } from "./regexp";

export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}

const parseEnvValue = (value: string) => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (numberReg.test(value)) return Number(value);
  if (objStrReg.test(value)) {
    const obj = value.trim().slice(1, value.length - 2);
    const list = obj.replace(/'|"/g, "").split(/,|:/g);
    const obRes: any = {};
    for (let i = 0; i < list.length - 1; i = i + 2) {
      const first = parseEnvValue(list[i].trim());
      const second = parseEnvValue(list[i + 1].trim());
      obRes[first] = second;
    }
    return obRes;
  }
  value = parseEnvArray(value);
  return value;
};

export const parseEnv = (envs): ViteEnv => {
  const res: any = {};
  for (const key in envs) {
    let env = envs[key].replace(/\\n/g, "\n");
    env = parseEnvValue(env);
    res[key] = env;
  }
  return res;
};

/**
 * 解析env中数组
 * @param value
 * @returns
 */
const parseEnvArray = (value) => {
  if (arrayStrReg.test(value)) {
    const list = value.match(arrayStrReg)[1].split(",");
    const result = list.reduce((acc, curr) => {
      acc.push(curr.replace(/'|"|\[|\]/g, ""));
      return acc;
    }, []);
    if (doubleArrayStrReg.test(value)) {
      const arr: any[] = [];
      for (let i = 0; i < result.length - 1; i = i + 2) {
        const first = parseEnvValue(result[i].trim());
        const second = parseEnvValue(result[i + 1].trim());
        arr.push([first, second]);
      }
      return arr;
    }
    return result;
  } else {
    return value;
  }
};
