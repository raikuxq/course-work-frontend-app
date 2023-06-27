<script setup lang="ts">
import {useQuery} from "@vue/apollo-composable";
import {CHANNELS_LIST_SHORT_QUERY} from "@/modules/channels/api/ChannelsList";
import {computed, onBeforeUnmount} from "vue";
import {ERouteName} from "@/router";
import {NDescriptions, NList, NListItem} from 'naive-ui';
import s from './ChannelsList.module.scss'
import { useEventBus } from '@vueuse/core'
import type {T_GQL_userChannels} from "@/types/graphql";
import {EEventBusEmits} from "@/types/common.types";

const {result, refetch} = useQuery<T_GQL_userChannels>(CHANNELS_LIST_SHORT_QUERY);

const eventBus = useEventBus(EEventBusEmits.CHANNELS_LIST_REFETCH)
const unsubscribe = eventBus.on(() => {
  refetch()
})


const channelsListMember = computed(() => {
  if (!result) {
    return [];
  }

  try {
    const {userChannelsMemberOf} = result.value

    return userChannelsMemberOf.map((userChannel) => userChannel.channel);
  } catch (e) {
    return []
  }
});


const channelsListOwn = computed(() => {
  if (!result) {
    return [];
  }

  try {
    const {userChannelsOwn} = result.value

    return userChannelsOwn
  } catch (e) {
    return []
  }
});


onBeforeUnmount(() => {
  unsubscribe()
})
</script>

<template>
  <div :class="s.channelsList">
    <div
        :class="s.channelsList__container"
        v-if="channelsListOwn.length"
    >
      <n-descriptions
          :title="$t('channels.list.titleOwn')"
          label-placement="top"
          :column="1"
          :class="s.channelsList__containerDesc"
      />
      <n-list :class="s.channelsList__containerList" :show-divider="false">
        <n-list-item
            v-for="item in channelsListOwn"
            :key="item?.id"
            :class="s.channelsList__containerListItem"
        >
          <RouterLink
              :class="s.channelsList__link"
              :to="{ name: ERouteName.CHANNEL, params: { channelId: item.id } }"
          >
            {{ item.title }}
          </RouterLink>
        </n-list-item>
      </n-list>
    </div>
    <div
        :class="s.channelsList__container"
        v-if="channelsListMember.length"
    >
      <n-descriptions
          :title="$t('channels.list.titleMemberOf')"
          label-placement="top"
          :column="1"
          :class="s.channelsList__containerDesc"
      />
      <n-list :class="s.channelsList__containerList" :show-divider="false">
        <n-list-item
            v-for="item in channelsListMember"
            :key="item?.id"
            :class="s.channelsList__containerListItem"
        >
          <RouterLink
              :class="s.channelsList__link"
              :to="{ name: ERouteName.CHANNEL, params: { channelId: item.id } }"
          >
            {{ item.title }}
          </RouterLink>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<style lang="scss" module src="./ChannelsList.module.scss"/>

