

<script setup lang="ts">
import s from './TheSidebar.module.scss'
import ChannelsList from "@/modules/channels/components/ChannelsList/ChannelsList.vue";
import {NButton} from 'naive-ui'
</script>

<template>
  <aside :class="s.sidebar">
    <router-link :to="{ name: 'home'}" :class="s.sidebar__logo">
      Logo
    </router-link>

    <div :class="s.sidebar__nav">
      <div :class="s.sidebar__navItem">
        <div :class="s.sidebar__navContent">
          <ChannelsList />
        </div>

        <div :class="s.sidebar__navContent">
          <n-button
              type="info"
              block
              strong
          >
            Create channel
          </n-button>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" module src="./TheSidebar.module.scss" />
