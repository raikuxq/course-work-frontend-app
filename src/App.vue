<script setup lang="ts">
import {useRoute} from 'vue-router'
import {computed} from "vue";
import {ELayoutType} from "@/router";
import TheLayoutAuth from "@/common/layouts/TheLayoutAuth/TheLayoutAuth.vue";
import TheLayoutMain from "@/common/layouts/TheLayoutMain/TheLayoutMain.vue";
import { NConfigProvider, NMessageProvider, NLoadingBarProvider, NDialogProvider } from 'naive-ui'

const currentRoute = useRoute()

const layoutComponent = computed(() => {
  const routeLayout = currentRoute.meta['layout'] as ELayoutType

  switch (routeLayout) {
    case ELayoutType.AUTH: {
      return TheLayoutAuth
    }
    case ELayoutType.MAIN: {
      return TheLayoutMain
    }
    default: {
      return TheLayoutAuth
    }
  }
})
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <n-loading-bar-provider>
          <component :is="layoutComponent" />
        </n-loading-bar-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
