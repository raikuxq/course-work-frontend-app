<template>
  <div :class="s.LayoutAuth">
    <div :class="s.LayoutAuth__logo">
      <TheBrandLogo />
    </div>

    <div :class="s.LayoutAuth__content">
      <router-view v-slot="{ Component, route }">
        <transition name="router-animation" mode="out-in">
          <div :key="route.name">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
  </div>

</template>

<script setup lang="ts">
import s from './TheLayoutAuth.module.scss'
import TheBrandLogo from "@/shared/components/layout/TheBrandLogo/TheBrandLogo.vue";
</script>

<style lang="scss" module src="./TheLayoutAuth.module.scss" />
