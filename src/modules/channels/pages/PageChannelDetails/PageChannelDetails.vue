<script setup lang="ts">
import ChannelsDetails from "@/modules/channels/components/ChannelsDetails/ChannelsDetails.vue";
import {useQuery} from "@vue/apollo-composable";
import {CHANNELS_BY_ID_QUERY} from "@/modules/channels/api/ChannelsById";
import {useRoute} from "vue-router";
import type {T_GQL_channel} from "@/types/graphql";
import {watch} from "vue";
import s from './PageChannelDetails.module.scss'

const route = useRoute()

const {result, loading, error, refetch} = useQuery<T_GQL_channel>(CHANNELS_BY_ID_QUERY, {
  id: route.params.channelId
});

watch(() => route.params.channelId, (newChannelId, oldChannelId) => {
  if (oldChannelId !== newChannelId) {
    refetch({
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
