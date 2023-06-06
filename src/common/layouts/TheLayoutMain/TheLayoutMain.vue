<script setup lang="ts">
import s from './TheLayoutMain.module.scss'
import TheSidebar from "@/common/components/layout/TheSidebar/TheSidebar.vue";
import TheHeader from "@/common/components/layout/TheHeader/TheHeader.vue";
</script>

<template>
  <div :class="s.LayoutMain__wrapper">

    <div :class="s.LayoutMain__sidebar">
      <TheSidebar />
    </div>

    <div :class="s.LayoutMain__container">

      <div :class="s.LayoutMain__main">
        <transition name="router-animation" mode="out-in">
          <slot />
        </transition>
      </div>

    </div>

  </div>
</template>

<style lang="scss" module src="./TheLayoutMain.module.scss" />
