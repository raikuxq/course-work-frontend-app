<template>
  <div :class="s.LayoutAuth">
    <transition :name="s.LayoutAuth__animation">
      <slot />
    </transition>
  </div>

</template>

<script setup lang="ts">
import s from './TheLayoutAuth.module.scss'
</script>

<style lang="scss" module src="./TheLayoutAuth.module.scss" />
