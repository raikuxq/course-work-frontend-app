<script setup lang="ts">
import ChannelsDetails from "@/modules/channels/components/ChannelsDetails/ChannelsDetails.vue";
import {useQuery} from "@vue/apollo-composable";
import {CHANNELS_BY_ID_QUERY} from "@/modules/channels/api/ChannelsById";
import {useRoute} from "vue-router";
import type {T_GQL_channel} from "@/shared/types/graphql";
import {watch} from "vue";
import s from './PageChannelDetails.module.scss'
import {useLoadingBar} from 'naive-ui'
import {ERouteName} from "@/app/router";
import ChannelsDetailsNav from "@/modules/channels/components/ChannelsDetailsNav/ChannelsDetailsNav.vue";
import {useEventBus} from "@vueuse/core";
import {EEventBusEmits} from "@/shared/types/common.types";

const route = useRoute()
const loadingBar = useLoadingBar()
const eventBus = useEventBus(EEventBusEmits.CHANNELS_LIST_REFETCH)


const {result, loading, refetch} = useQuery<T_GQL_channel>(CHANNELS_BY_ID_QUERY, {
  id: route.params.channelId
});

const onUpdateData = () => {
  refetch()
  eventBus.emit()
}

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
      <template v-if="route.name === ERouteName.CHANNEL">
        <div :class="s.PageChannelDetails__sidebar">
          <ChannelsDetails v-bind="result.channel"/>
        </div>

        <div :class="s.PageChannelDetails__content">
          <ChannelsDetailsNav
              v-bind="result.channel"
              @update-data="onUpdateData"
          />
        </div>

      </template>

      <div :class="s.PageChannelDetails__content" v-else>
        <router-view v-slot="{ Component }">
          <component
              :is="Component"
              @update-data="onUpdateData"
          />
        </router-view>
      </div>

    </template>
  </div>
</template>
