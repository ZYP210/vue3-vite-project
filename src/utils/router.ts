const VIEW_ROUTES = import.meta.glob('@/views/**/**.vue');
export const loadView = (name: string) => VIEW_ROUTES[/* @vite-ignore */ `/src/views${name}.vue`];

const PAGE_ROUTES = import.meta.glob('@/pages/**/**.vue');
export const loadPage = (name: string) => PAGE_ROUTES[/* @vite-ignore */ `/src/pages${name}.vue`];
