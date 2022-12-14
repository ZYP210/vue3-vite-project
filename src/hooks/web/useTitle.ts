import { watch, unref } from "vue";
import { useTitle as usePageTitle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useGlobalConfig } from "@/hooks/config/useGlobalConfig";
/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { VITE_GLOB_APP_TITLE } = useGlobalConfig();
  const title = VITE_GLOB_APP_TITLE;
  const { currentRoute } = useRouter();

  const pageTitle = usePageTitle();

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute);

      const tTitle = route?.meta?.title;
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true },
  );
}
