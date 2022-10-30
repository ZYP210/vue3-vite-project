<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useTitle } from "@/hooks/web/useTitle";

dayjs.locale("zh-cn");

const locale = ref(zhCN);

// Listening to page changes and dynamically changing site titles
useTitle();

</script>
