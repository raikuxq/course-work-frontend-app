<script setup lang="ts">
import ChannelsDetails from "@/modules/channels/components/ChannelsDetails/ChannelsDetails.vue";
import {useQuery} from "@vue/apollo-composable";
import {CHANNELS_BY_ID_QUERY} from "@/modules/channels/api/ChannelsById";
import {useRoute} from "vue-router";
import type {T_GQL_channel} from "@/types/graphql";
import {watch} from "vue";
import s from './PageChannelDetails.module.scss'
import { useLoadingBar } from 'naive-ui'

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
    <div v-if="result" :class="s.PageChannelDetails__sidebar">
      <ChannelsDetails v-bind="result.channel" />
    </div>

    <div :class="s.PageChannelDetails__content">
      <RouterView />
    </div>
  </div>
</template>
