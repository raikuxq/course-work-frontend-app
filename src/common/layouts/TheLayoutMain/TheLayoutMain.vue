<script setup lang="ts">
import s from './TheLayoutMain.module.scss'
import TheSidebar from "@/common/components/layout/TheSidebar/TheSidebar.vue";
</script>

<template>
  <div :class="s.LayoutMain__wrapper">

    <div :class="s.LayoutMain__sidebar">
      <TheSidebar />
    </div>

    <div :class="s.LayoutMain__header" />

    <div :class="s.LayoutMain__container">
      <main :class="s.LayoutMain__main">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </main>
    </div>

  </div>
</template>

<style lang="scss" module src="./TheLayoutMain.module.scss" />
