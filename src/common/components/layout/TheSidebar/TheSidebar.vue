<script setup lang="ts">
import s from './TheSidebar.module.scss'
import ChannelsList from "@/modules/channels/components/ChannelsList/ChannelsList.vue";
import {NButton, NSpace, NIcon} from 'naive-ui'
import TheBrandLogo from "@/common/components/layout/TheBrandLogo/TheBrandLogo.vue";
import {RouterLink} from "vue-router";
import ProfileWidget from "@/modules/profile/components/ProfileWidget/ProfileWidget.vue";
import {ERouteName} from "@/router";
import {LinkSharp as IconLinkSharp, Add as IconAdd} from "@vicons/ionicons5";
import ChannelsCreateForm from "@/modules/channels/components/ChannelsCreateForm/ChannelsCreateForm.vue";
import {ref} from "vue";
import ChannelsJoinForm from "@/modules/channels/components/ChannelsJoinForm/ChannelsJoinForm.vue";
import {useEventBus} from "@vueuse/core";
import {EEventBusEmits} from "@/types/common.types";


const eventBus = useEventBus(EEventBusEmits.CHANNELS_LIST_REFETCH)


const isModalCreateOpen = ref<boolean>(false)
const isModalJoinOpen = ref<boolean>(false)

const emitChannelsUpdate = () => {
  eventBus.emit()
}
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
                @click="isModalCreateOpen = true"
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
                @click="isModalJoinOpen = true"
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

  <ChannelsCreateForm
      :is-modal-open="isModalCreateOpen"
      @close-modal="isModalCreateOpen = false"
      @update-data="emitChannelsUpdate"
  />

  <ChannelsJoinForm
      :is-modal-open="isModalJoinOpen"
      @close-modal="isModalJoinOpen = false"
      @update-data="emitChannelsUpdate"
  />
</template>

<style lang="scss" module src="./TheSidebar.module.scss"/>
