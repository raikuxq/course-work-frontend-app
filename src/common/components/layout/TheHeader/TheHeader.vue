<script lang="ts" setup>
import s from './TheHeader.module.scss'
import {RouterLink} from "vue-router";
</script>

<template>
  <header :class="s.header">
    <div :class="s.header__toggle">
      Changer Sidebar
    </div>

    <nav :class="s.header__nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/auth">Auth</RouterLink>
    </nav>

    <div :class="s.header__profile">
      Profile
    </div>

    <div :class="s.header__button">
      Settings
    </div>
  </header>
</template>

<style lang="scss" module src="./TheHeader.module.scss" />
