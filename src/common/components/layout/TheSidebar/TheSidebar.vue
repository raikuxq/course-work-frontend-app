<script setup lang="ts">
import s from './TheSidebar.module.scss'
import ChannelsList from "@/modules/channels/components/ChannelsList/ChannelsList.vue";
import {NButton} from 'naive-ui'
import TheBrandLogo from "@/common/components/layout/TheBrandLogo/TheBrandLogo.vue";
import {RouterLink} from "vue-router";
import {useLogout} from "@/common/hooks/useLogout";

const {logout} = useLogout()
</script>

<template>
  <aside :class="s.sidebar">
    <router-link :to="{ name: 'home'}" :class="s.sidebar__logo">
      <TheBrandLogo />
    </router-link>

    <div :class="s.sidebar__nav">
      <div :class="s.sidebar__navItem">
        <div :class="s.sidebar__navContent">
          <ChannelsList />
        </div>

        <div :class="s.sidebar__navContent">
          <n-button
              type="primary"
              block
              strong
          >
            Create channel
          </n-button>
        </div>

        <div :class="s.sidebar__navContent">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/auth">Auth</RouterLink>
          <RouterLink to="/auth" @click.prevent="logout">Logout</RouterLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" module src="./TheSidebar.module.scss" />
