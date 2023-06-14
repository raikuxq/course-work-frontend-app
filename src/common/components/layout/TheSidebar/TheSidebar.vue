<script setup lang="ts">
import s from './TheSidebar.module.scss'
import ChannelsList from "@/modules/channels/components/ChannelsList/ChannelsList.vue";
import {NButton, NSpace, NIcon, NDescriptions} from 'naive-ui'
import TheBrandLogo from "@/common/components/layout/TheBrandLogo/TheBrandLogo.vue";
import {RouterLink} from "vue-router";
import ProfileWidget from "@/modules/profile/components/ProfileWidget/ProfileWidget.vue";
import {ERouteName} from "@/router";
import {LinkSharp as IconLinkSharp, Add as IconAdd} from "@vicons/ionicons5";
</script>

<template>
  <aside :class="s.sidebar">
    <router-link :to="{ name: ERouteName.HOME }" :class="s.sidebar__logo">
      <TheBrandLogo/>
    </router-link>

    <div :class="s.sidebar__nav">
      <div :class="s.sidebar__navItem">
        <div :class="s.sidebar__navContent">
          <n-space
              vertical
              size="small"
              :class="s.sidebar__space"
          >
            <n-descriptions
                :title="$t('channels.list.title')"
                label-placement="top"
                :column="1"
                :class="s.sidebar__descContainer"
            />

            <ChannelsList/>
          </n-space>
        </div>

        <div :class="s.sidebar__navContent">
          <n-space
              vertical
              size="large"
              :class="s.sidebar__space"
          >
            <n-button
                type="primary"
                block
                strong
            >
              {{ $t('channels.actions.create') }}
              <template #icon>
                <n-icon>
                  <icon-add />
                </n-icon>
              </template>
            </n-button>

            <n-button
                type="primary"
                block
                secondary
                strong
            >
              {{ $t('channels.actions.join') }}
              <template #icon>
                <n-icon>
                  <icon-link-sharp />
                </n-icon>
              </template>
            </n-button>
          </n-space>

        </div>
      </div>

      <ProfileWidget/>
    </div>
  </aside>
</template>

<style lang="scss" module src="./TheSidebar.module.scss"/>
