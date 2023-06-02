<script setup lang="ts">
import ChannelsDetails from "@/modules/channels/components/ChannelsDetails/ChannelsDetails.vue";
import {useQuery} from "@vue/apollo-composable";
import {CHANNELS_BY_ID_QUERY} from "@/modules/channels/api/ChannelsById";
import {useRoute} from "vue-router";
import type {T_GQL_channel} from "@/types/graphql";
import {watch} from "vue";

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
  <div>
    <div v-if="result">
      <ChannelsDetails v-bind="result.channel" />
    </div>
  </div>
</template>
