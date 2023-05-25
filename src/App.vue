<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import {computed} from "vue";
import {ELayoutType} from "@/router";
import TheLayoutAuth from "@/common/layouts/TheLayoutAuth/TheLayoutAuth.vue";
import TheLayoutMain from "@/common/layouts/TheLayoutMain/TheLayoutMain.vue";

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
      return TheLayoutMain
    }
  }
})
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
