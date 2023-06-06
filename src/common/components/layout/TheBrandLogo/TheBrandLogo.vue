<script setup lang="ts">
import { Bug as IconBug} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import s from './TheBrandLogo.module.scss'
</script>

<style scoped>

</style>

<template>
  <div :class="s.TheBrandLogo">
    <div :class="s.TheBrandLogo__icon">
      <n-icon size="40">
        <icon-bug />
      </n-icon>
    </div>

    <div :class="s.TheBrandLogo__text">
      Bug Tracker
    </div>
  </div>
</template>
