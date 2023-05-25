<template>
  <aside :class="s.sidebar">

    <router-link :to="{ name: 'home'}" :class="s.sidebar__logo">
      Logo
    </router-link>

    <div :class="s.sidebar__nav">
      <div :class="s.sidebar__navItem">
        <div :class="s.sidebar__navHeader">
          <ChannelsList />

          Btn Create Button
        </div>
      </div>
    </div>

  </aside>

</template>

<script setup lang="ts">
import s from './TheSidebar.module.scss'
import ChannelsList from "@/modules/channels/components/ChannelsList/ChannelsList.vue";
</script>

<style lang="scss" module src="./TheSidebar.module.scss" />
