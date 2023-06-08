<script setup lang="ts">
import ChannelsDetails from "@/modules/channels/components/ChannelsDetails/ChannelsDetails.vue";
import {useQuery} from "@vue/apollo-composable";
import {CHANNELS_BY_ID_QUERY} from "@/modules/channels/api/ChannelsById";
import {useRoute} from "vue-router";
import type {T_GQL_channel} from "@/types/graphql";
import {watch} from "vue";
import s from './PageChannelDetails.module.scss'
import { useLoadingBar } from 'naive-ui'
import {ERouteName} from "@/router";
import ChannelsDetailsNav from "@/modules/channels/components/ChannelsDetailsNav/ChannelsDetailsNav.vue";

const route = useRoute()
const loadingBar = useLoadingBar()


const {result, loading, error, refetch} = useQuery<T_GQL_channel>(CHANNELS_BY_ID_QUERY, {
  id: route.params.channelId
});


watch(() => loading, (value, oldValue) => {
  if (!oldValue && value) {
    loadingBar.start()
  }

  if (!value) {
    loadingBar.finish()
  }
})


watch(() => route.params.channelId, async (newChannelId, oldChannelId) => {
  if (oldChannelId !== newChannelId) {
    await refetch({
      id: newChannelId
    })
  }
})
</script>


<template>
  <div :class="s.PageChannelDetails">
    <template v-if="result">
      <div :class="s.PageChannelDetails__sidebar">
        <ChannelsDetails v-bind="result.channel" />
      </div>

      <div :class="s.PageChannelDetails__content">
        <template v-if="route.name === ERouteName.CHANNEL">
          <ChannelsDetailsNav
              :id="result.channel.id"
              :title="result.channel.title"
              :categories="result.channel.categories"
          />
        </template>

        <template v-else>
          <router-view v-slot="{ Component, route }">
            <transition name="router-animation" mode="out-in">
              <div :key="route.name">
                <component :is="Component" />
              </div>
            </transition>
          </router-view>
        </template>
      </div>
    </template>
  </div>
</template>
