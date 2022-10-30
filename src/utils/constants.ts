import { name } from "../../package.json";

export const PROJECT_NAME = name.replace(/-/g, "_").toLocaleUpperCase();
