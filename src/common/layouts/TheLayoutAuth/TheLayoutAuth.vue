<template>
  <div :class="s.LayoutAuth">
    <div :class="s.LayoutAuth__logo">
      <TheBrandLogo />
    </div>

    <div :class="s.LayoutAuth__content">
      <transition :name="s.LayoutAuth__animation">
        <slot />
      </transition>
    </div>
  </div>

</template>

<script setup lang="ts">
import s from './TheLayoutAuth.module.scss'
import TheBrandLogo from "@/common/components/layout/TheBrandLogo/TheBrandLogo.vue";
</script>

<style lang="scss" module src="./TheLayoutAuth.module.scss" />
